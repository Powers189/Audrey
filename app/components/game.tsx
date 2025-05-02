class Game {
  private _guessleft: number;
  private _board: string;
  private _guessedletterslist: string[];
  private _guessedletters: string;
  private _wordlist: string[];
  private _wordvector: string[];
  private _seewords: boolean;
  sizes: number[];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }

  start_new_game(num_guesses: string, wordlength: string, seewords: boolean) {}

  // player guesses letter c; return whether or not char is in word
  process_guess(c: string): boolean {}

  // display current state of word - guessed characters or '-'
  get_display_word(): string {}

  // How many guesses remain?
  get_guesses_remaining(): number {}

  // What characters have already been guessed (for display)?
  get_guessed_chars(): string {}

  // Has this character already been guessed?
  was_char_guessed(c: string): boolean {}

  // Has the game been won/lost?  (Else, it continues.)
  is_won(): string {}
  is_lost(): string {}

  // Return the true hidden word.
  get_hidden_word(): string {}
}

const user = new Person("Alice", 30);
user.greet(); // Hello, my name is Alice
