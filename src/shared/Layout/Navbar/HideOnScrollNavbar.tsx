import { Box } from "@chakra-ui/react";
import { ReactNode, useState, useEffect } from "react";

interface HideOnScrollNavbarProps {
  children: ReactNode;
}

const HideOnScrollNavbar: React.FC<HideOnScrollNavbarProps> = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const isScrollingDown = currentScrollPos > lastScrollPos;

    if (isScrollingDown) {
      setScrollCount((prevCount) => prevCount + 1);
      if (scrollCount >= 1) {
        setShowNavbar(false);
      }
    } else {
      setScrollCount(0);
      setShowNavbar(true);
    }

    setLastScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos, scrollCount]);

  return (
    <Box
      w="100%"
      position="fixed"
      zIndex="10"
      transition="transform 0.3s ease"
      transform={showNavbar ? "translateY(0)" : "translateY(-100%)"}
    >
      {children}
    </Box>
  );
};

export default HideOnScrollNavbar;
