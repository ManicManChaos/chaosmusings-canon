export default function manifest() {
  return {
    name: "Chaos Musings",
    short_name: "Chaos",
    description: "Manic Musings of Chaos — Canon",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0e0c",
    theme_color: "#0b0e0c",
    icons: [
      {
        src: "/app/icon-120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "/app/icon-167.png",
        sizes: "167x167",
        type: "image/png",
      },
      {
        src: "/app/icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
