import React from "react";
import { Divider } from "@heroui/react";
import FooterContent from "./footerContent";

function Footer() {
  return (
    <footer className="p-5 sm:p-10 pb-3 sm:pb-6  bg-neutral-200">
      <FooterContent />
      <Divider />
      <p className="text-center text-sm text-neutral-600 mt-4">
        &copy; {new Date().getFullYear()} Ecom Storefront. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
