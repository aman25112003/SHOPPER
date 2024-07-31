import React from "react";
import "./DescriptionBox.css";
export const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>

        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>

      <div className="descriptionbox-description">
        <p>
          An ecommerce website is an online platform where businesses sell
          products or services to consumers over the internet. It allows
          customers to browse through various products, add items to their
          shopping cart, and complete transactions securely using electronic
          payment methods. Ecommerce websites often include features such as
          product categorization, search functionality, customer reviews, secure
          payment gateways, and order tracking. They serve as virtual
          storefronts, enabling businesses to reach a wider audience beyond
          their physical location and operate 24/7 without geographical
          limitations. Examples include Amazon, eBay, and Shopify stores.
        </p>

        <p>
          An ecommerce website displays products with descriptions, prices, and
          images, enabling users to browse categories, search for specific
          items, and add them to their shopping carts. It includes a navigation
          menu for easy exploration, a search bar for quick access to products,
          and a checkout process for completing purchases securely. Users can
          create accounts, manage profiles, and access support features like
          live chat. Promotions and security information are highlighted, and
          contact details are provided for customer inquiries. The site's footer
          typically contains links to important pages such as terms of service
          and FAQs, ensuring a comprehensive and user-friendly online shopping
          experience.
        </p>
      </div>
    </div>
  );
};
