const standardModeColors = {
  dark: "white",
  light: "black"
}

const standardOriginalColors = {
  dark: "black",
  light: "white"
}

const primaryColor = {

  Pink : "#FF3567",
  Purple : "#7A73FC",
  Yellow: "#FCC02A",
  Blue : "#1586F6",
  Green: "#12AC12",
  Orange: "#F8981D",
  Red: "#F54A4A",
  Cyan: "#1BBDD4",
  Brown: "#7A5648",
  Grey: "#93979F",
  Black: "#000000",
  White: "#FFFFFF"

};

const secondaryColor = {

  Pink : "#FF3567",
  Purple : "#7A73FC",
  Yellow: "#FCC02A",
  Blue : "#1586F6",
  Green: "#12AC12",
  Orange: "#F8981D",
  Red: "#F54A4A",
  Cyan: "#1BBDD4",
  Brown: "#7A5648",
  Grey: "#93979F",
  Black: "#000000",
  White: "#FFFFFF"
  
};

const fontWeight = {
  Light: 300,
  Regular: 400,
  Medium: 500,
  Semibold: 600,
  Bold: 700,
  Heavy: 900
}

export const assignColors = () => {

  const font_weight_headline = fontWeight[process.env.NEXT_PUBLIC_FONT_WEIGHT_HEADLINE.replaceAll('"',"")] ?? 700;
  const font_weight_body = fontWeight[process.env.NEXT_PUBLIC_FONT_WEIGHT_BODY.replaceAll('"',"")] ?? 500;

  const currentStandardMode = standardModeColors[process.env.NEXT_PUBLIC_STANDARD_MODE.replaceAll('"',"")] ?? "white";
  const currentStandardOriginal = standardOriginalColors[process.env.NEXT_PUBLIC_STANDARD_MODE.replaceAll('"',"")] ?? "black";
  const currentPrimaryColor = primaryColor[process.env.NEXT_PUBLIC_PRIMARY_COLOR.replaceAll('"',"")] ?? (process.env.NEXT_PUBLIC_PRIMARY_COLOR != "" ? process.env.NEXT_PUBLIC_PRIMARY_COLOR : "white");
  const currentSecondaryColor = secondaryColor[process.env.NEXT_PUBLIC_SECONDARY_COLOR.replaceAll('"',"")] ?? (process.env.NEXT_PUBLIC_SECONDARY_COLOR != "" ? process.env.NEXT_PUBLIC_SECONDARY_COLOR : "rgba(255, 255, 255, 0.25)");
  
  const mt_live_auction = !isNaN( Number(process.env.NEXT_PUBLIC_MARGIN_TOP_LIVE_AUCTION) ) ? process.env.NEXT_PUBLIC_MARGIN_TOP_LIVE_AUCTION + "px" : "3px";
  document.documentElement.style.setProperty('--mt-live_auction', mt_live_auction);

  document.documentElement.style.setProperty('--standard-mode', currentStandardMode );
  document.documentElement.style.setProperty('--standard-original', currentStandardOriginal );
  document.documentElement.style.setProperty('--color-primary', currentPrimaryColor );
  document.documentElement.style.setProperty('--color-secondary', currentSecondaryColor );

  //Inyect new Font weight

  document.documentElement.style.setProperty('--fw-headine', font_weight_headline );
  document.documentElement.style.setProperty('--fw-body', font_weight_body );

}

