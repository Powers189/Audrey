/*
   main.cpp

   Implements the user interface for hangman.

   assignment: CSCI 262 Project - Evil Hangman

   author:

   last modified: 3/7/2019
*/

#include <iostream>
#include <string>
#include <cstdlib>
#include <cctype>
#include <fstream>
#include <sstream>
#include <list>
#include <vector>
#include <set>

#include "hangman.h"

using namespace std;

// helper function prototypes
int get_integer(string prompt); // return a positive integer
char get_letter(string prompt); // return a valid lowercase letter
bool get_yesno(string prompt);  // return true == yes / false == no
string trim(string s);          // remove leading/trailing whitespace

int main()
{
    cout << "Welcome to Hangman!" << endl;
    cout << "===================" << endl
         << endl;

    // get the hangman object
    hangman game;

    // Keep playing the game until the user decides otherwise

    while (true)
    {
        int length;
        length = get_integer("what length word");
        bool valid;
        while (valid == false)
        {
            for (int i = 0; i < game.sizes.size(); i++)
            { // checks to see if length entered is in sizes vector
                if (length == game.sizes.at(i))
                {
                    valid = true;
                }
            }
            if (valid != true)
            {
                length = get_integer("what length word");
            }
        }

        // prompts user for how many guesses they want
        int num_guesses = get_integer("How many guesses would you like?");
        cout << endl;

        // prompt user to decide whether or not they want to see how many words
        bool seewords;
        seewords = get_yesno("Would You like to see how many words are left?");

        game.start_new_game(num_guesses, length, seewords); // start game with user info

        while (!game.is_won() && !game.is_lost())
        {
            cout << "Your word is: " << game.get_display_word() << endl;

            string already_guessed = game.get_guessed_chars();
            if (already_guessed.size() == 0)
            {
                cout << "You have not yet guessed any letters." << endl;
            }
            else
            {
                cout << "You have already guessed these letters: ";
                cout << already_guessed << endl;
            }

            cout << "You have " << game.get_guesses_remaining();
            cout << " guesses remaining." << endl
                 << endl;

            char guess = get_letter("What is your next guess?");
            while (game.was_char_guessed(guess))
            {
                cout << endl
                     << "You already guessed that!" << endl;
                guess = get_letter("What is your next guess?");
            }
            cout << endl;

            bool good_guess = game.process_guess(guess);
            if (good_guess)
            {
                cout << "Good guess!" << endl;
            }
            else
            {
                cout << "Sorry, that letter isn't in the word." << endl;
            }

            if (game.is_won())
            {
                cout << "Congratulations! You won the game!" << endl;
                cout << "The word was " << game.get_display_word();
            }

            if (game.is_lost())
            {
                cout << "Oh no! You lost!!!" << endl;
                cout << "My secret word was: " << game.get_hidden_word() << endl;
            }
        }

        cout << endl;
        if (!get_yesno("Would you like to play again (y/n)?"))
            break;
    }

    cout << endl
         << "Thank you for playing Hangman." << endl;

    return 0;
}

// Prompt for a positive integer response, re-prompting if invalid
// input is given. This is not super-robust - it really should work
// harder to filter out responses like "123foo", but oh well.
int get_integer(string msg)
{
    while (true)
    {
        string input;
        int result = 0;

        cout << msg << endl;
        getline(cin, input);

        result = atoi(input.c_str());
        if (result > 0)
            return result;

        cout << "I didn't understand that. Please enter a positive integer.";
        cout << endl;
    }
}

// Prompt for a letter of the alphabet, re-prompting if invalid
// input is given.
char get_letter(string msg)
{
    while (true)
    {
        string input;

        cout << msg << endl;
        getline(cin, input);

        input = trim(input);

        if (input.size() == 1)
        {
            char result = tolower(input[0]);
            if (result >= 'a' && result <= 'z')
                return result;
        }

        cout << "I didn't understand that. ";
        cout << "Please enter a letter of the alphabet.";
        cout << endl;
    }
}

// Prompt for a yes/no response, re-prompting if invalid
// input is given.
bool get_yesno(string msg)
{
    while (true)
    {
        string input;

        cout << msg << endl;
        getline(cin, input);

        input = trim(input);
        for (int i = 0; i < input.size(); i++)
        {
            input[i] = tolower(input[i]);
        }

        if (input == "y" || input == "yes")
            return true;
        if (input == "n" || input == "no")
            return false;

        cout << "I didn't understand that. ";
        cout << "Please enter y(es) or n(o).";
        cout << endl;
    }
}

string trim(string s)
{
    int a, b;

    for (a = 0; a < s.size() && isspace(s[a]); a++)
        ;
    for (b = s.size() - 1; b >= a && isspace(s[b]); b--)
        ;

    return s.substr(a, b - a + 1);
}

Class
/*
   hangman.cpp

   Method implementations for the hangman class.

   assignment: CSCI 262 Project - Evil Hangman

   author:

   last modified: 3/7/2019
*/

#include "hangman.h"
#include <fstream>
#include <sstream>
#include <list>
#include <map>
#include <iostream>
#include <vector>
#include <string>
#include <set>

    using namespace std;

// constructor
hangman::hangman()
{
    // puts words from dictionary into a vector
    ifstream input("dictionary.txt");
    string word;

    while (!input.eof())
    {
        input >> word;
        _wordvector.push_back(word);
        // this makes a vector that keeps track of all of the potential sizes of words
        bool invector = false;
        for (int i = 0; i < sizes.size(); i++)
        {
            if (sizes.at(i) == word.size())
            {
                invector = true;
                break;
            }
        }
        if (invector == false)
        { // if the size isn't already in the vector add it.
            sizes.push_back(word.size());
        }
    }
}

// start_new_game()
//
// Setup a new game of hangman.
void hangman::start_new_game(int num_guesses, int wordlength, bool seewords)
{
    // initialize guesses,set private variable _seewords to yes or no,initialize board to blank
    // clear wordlist and set guessed letter=0
    _guessleft = num_guesses;
    _seewords = seewords;
    _board = "";
    _wordlist.clear();

    _guessedletterslist.clear();
    _guessedletters = "";

    // set the board to _______ for chosen length
    for (int i = 0; i < wordlength; i++)
    {
        _board = _board + '_';
    }

    // puts only words of the right length from the word vector into the word list
    for (int i = 0; i < _wordvector.size(); i++)
    {
        if (_wordvector.at(i).size() == wordlength)
        {
            _wordlist.push_back(_wordvector.at(i));
        }
    }
}

// process_guess()
//
// Process a player's guess - should return true/false depending on whether
// or not the guess was in the hidden word.  If the guess is incorrect, the
// remaining guess count is decreased.
bool hangman::process_guess(char c)
{
    // add and sort the guessed letters
    _guessedletterslist.push_back(c);
    _guessedletterslist.sort();
    _guessedletters = "";
    for (char letter : _guessedletterslist)
    {
        _guessedletters = _guessedletters + letter;
    }

    // initiliaze a map for each guess
    // map key=family type ( ex ___a__   a_____ _____a ) and a value of the number of words in that family
    map<string, int> wordfamilymap;
    wordfamilymap.clear();

    string family;
    string word;
    for (string &dicword : _wordlist)
    { // goes through every word in word list
        family = _board;
        for (int i = 0; i < dicword.length(); i++)
        {
            if (dicword.at(i) == c)
            {
                family.at(i) = c; // puts in terms of the board ie ___c__ form
            }
        }

        if (wordfamilymap.count(family) == 0)
        { // if family doesn't exit in word map add it and change the count to 1
            wordfamilymap.insert({family, 1});
        }
        else
        {
            wordfamilymap.at(family)++; // if family already in word map increase the count for that family
        }
    }
    // uncomment for testing
    //  for (std::map<string, int>::iterator it = wordfamilymap.begin(); it != wordfamilymap.end(); ++it){
    //    cout <<it->first<< " "<<it->second<<endl;
    //}

    // finds the biggest word family
    string biggestfamily;
    int biggestfamilysize = 0;
    for (std::map<string, int>::iterator it = wordfamilymap.begin(); it != wordfamilymap.end(); ++it)
    {

        if (it->second > biggestfamilysize)
        {
            biggestfamilysize = it->second;
            biggestfamily = it->first;
        }
    }
    // uncomment for testing
    // cout <<"The biggest family is"<<biggestfamily<<"with a size of "<< biggestfamilysize<<endl;

    string familytype;
    vector<string> erasewords;
    // Then remove all words that dont fit pattern of biggest family
    for (string &dicword : _wordlist)
    {
        familytype = _board; //_______
        for (int i = 0; i < dicword.length(); i++)
        {
            if (dicword.at(i) == c)
            {
                familytype.at(i) = c;
            }
        }
        if (familytype != biggestfamily)
        {
            erasewords.push_back(dicword);
        }
    }
    for (int i = 0; i < erasewords.size(); i++)
    {
        _wordlist.remove(erasewords.at(i));
    }

    _board = biggestfamily; // set the board equal to biggest family
    if (_seewords == true)
    {
        cout << "the amount of words it could be is " << _wordlist.size() << endl;
    }

    if (_board.find(c) != string::npos)
    { // if the board has the guess in it return true else false and take away guess
        return true;
    }
    else
    {
        _guessleft--;
        return true;
    }
}

// get_display_word()
//
// Return a representation of the hidden word, with unguessed letters
// masked by '-' characters.

string hangman::get_display_word()
{
    return _board;
}

// get_guesses_remaining()
//
// Return the number of guesses remaining for the player.
int hangman::get_guesses_remaining()
{
    return _guessleft;
}

// get_guessed_chars()
//
// What letters has the player already guessed?  Return in alphabetic order.
string hangman::get_guessed_chars()
{
    return _guessedletters;
}

// was_char_guessed()
//
// Return true if letter was already guessed.
bool hangman::was_char_guessed(char c)
{
    if (_guessedletters.find(c) != std::string::npos)
    {
        return true;
    }
    return false;
}

// is_won()
//
// Return true if the game has been won by the player.
bool hangman::is_won()
{
    if (_board.find('_') == std::string::npos)
    {
        return true;
    }
    return false;
}

// is_lost()
//
// Return true if the game has been lost.
bool hangman::is_lost()
{
    if (_guessleft == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// get_hidden_word
//
// Return the true hidden word to show the player.
string hangman::get_hidden_word()
{
    return _wordlist.begin()->data(); // finds first word in wordlist
}

H file
#include <string>
#include <list>
#include <vector>
#include <set>

    using namespace std;

/******************************************************************************
  class hangman

  Maintains game state for a game of hangman.

******************************************************************************/

class hangman
{
public:
    hangman();

    // start a new game where player gets num_guesses unsuccessful tries
    void start_new_game(int num_guesses, int wordlength, bool seewords);
    vector<int> sizes; // keeps track of the possible sizes of words

    // player guesses letter c; return whether or not char is in word
    bool process_guess(char c);

    // display current state of word - guessed characters or '-'
    string get_display_word();

    // How many guesses remain?
    int get_guesses_remaining();

    // What characters have already been guessed (for display)?
    string get_guessed_chars();

    // Has this character already been guessed?
    bool was_char_guessed(char c);

    // Has the game been won/lost?  (Else, it continues.)
    bool is_won();
    bool is_lost();

    // Return the true hidden word.
    string get_hidden_word();

private:
    string _board;
    int _guessleft;
    list<char> _guessedletterslist;
    string _guessedletters;
    list<string> _wordlist;
    vector<string> _wordvector;
    bool _seewords;
};

#endif
