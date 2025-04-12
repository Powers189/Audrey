import react from "react";
import { Link } from "react-router-dom";
import routes from "~/routes";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useLocation } from "react-router-dom";

const navigation = [
  { name: "Welcome", href: "/" },
  { name: "Paintings", href: "/Paintings" },
  { name: "About", href: "/about" },
  { name: "Fiber-Arts", href: "/FiberArts" },
];

// should highlight current one
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Disclosure as="nav" className="bg-violet-300 sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-[2400px] px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 text-white group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const isCurrent = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      isCurrent
                        ? "bg-violet-400 text-white font-[VT323] text-3xl"
                        : "text-white hover:bg-fuchsia-300 hover:text-white font-[VT323] text-3xl",
                      "rounded-sm px-3 py-2 text-md font-large"
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isCurrent = location.pathname === item.href;

            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={classNames(
                  isCurrent
                    ? "bg-violet-400 text-white font-[VT323] text-2xl"
                    : "text-white hover:bg-fuchsia-300 hover:text-white font-[VT323] text-2xl",
                  "block rounded-sm px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
