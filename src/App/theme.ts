import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  // Global Styles
  styles: {
    global: {
      "html, body, #root": {
        height: "100%"
      }
    }
  },

  // Colors
  colors: {
    black: {
      500: "#000"
    },
    purple: {
      "50": "#E6E6F8",
      "100": "#CACAF0",
      "200": "#9292E1",
      "300": "#5A5AD1",
      "400": "#c1a7fe",
      "500": "#c0cbff",
      "600": "#1E1E6B",
      "700": "#19195B",
      "800": "#15154B",
      "900": "#10103B"
    },
    green: {
      "50": "#D9F4F2",
      "100": "#C3EEEB",
      "200": "#98E2DD",
      "300": "#6CD5CE",
      "400": "#c8fcba",
      "500": "#2EA39B",
      "600": "#25837D",
      "700": "#1C635E",
      "800": "#134440",
      "900": "#0A2422"
    },
    red: {
      "50": "#gebbc2",
      "100": "#FFD6DD",
      "200": "#FFB3C0",
      "300": "#FE8FA3",
      "400": "#FE6C86",
      "500": "#FE4869",
      "600": "#FE153F",
      "700": "#DF0129",
      "800": "#AC0120",
      "900": "#790117"
    },
    yellow: {
      "50": "#ffd8b6",
      "100": "#F4F4F5",
      "200": "#E4E4E7",
      "300": "#D4D4D8",
      "400": "#fefeca",
      "500": "#71717A",
      "600": "#52525B",
      "700": "#3F3F46",
      "800": "#27272A",
      "900": "#18181B"
    }
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif"
  },
  shadows: {
    card: "-3px 9px 48px -3px rgba(0, 0, 0, 0.1)",
    xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  },
  // Components
  components: {
    Button: {
      defaultProps: {
        colorScheme: "red",
        size: "sm"
      }
    },
    Input: {
      defaultProps: {
        size: "sm"
      }
    },
    FormLabel: {
      baseStyle: {
        marginBottom: "1",
        fontWeight: "300",
        fontSize: "sm"
      }
    },
    FormError: {
      baseStyle: {
        text: {
          mt: 1,
          fontSize: "xs"
        }
      }
    },
    // Menu
    Menu: {
      baseStyle: {
        item: {
          borderRadius: 4
        },
        list: {
          px: 2,
          borderWidth: "1px",
          borderColor: "gray.100",
          shadow: "sm",
          zIndex: 999
        }
      }
    },
    Modal: {
      defaultProps: {
        isCentered: true
      },
      baseStyle: {
        dialogContainer: {
          // alignItems: "flex-start"
        }
      }
    },
    Accordion: {
      baseStyle: {
        container: {
          borderTopWidth: "0px",
          borderBottomWidth: "1px",
          _last: {
            borderBottomWidth: "0px"
          }
        },
        icon: {
          marginLeft: "auto"
        },
        button: {
          fontSize: "lg",
          fontWeight: "300",
          textAlign: "left",
          px: 0,
          py: "4",
          _focus: {
            boxShadow: "none"
          },
          _hover: {
            bg: "transparent"
          }
        },
        panel: {
          pb: "4",
          pl: "4",
          px: 0,
          pt: 0,
          fontSize: "sm"
        }
      }
    },
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: "#237B75",
          rounded: "2xl",
          boxShadow: "4px 0px 12px rgba(23, 23, 83, 0.25)"
        }
      }
    }
  }
});
