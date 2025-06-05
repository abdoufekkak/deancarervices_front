import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";

export function getImageByType(type) {
  switch (type) {
    case "Economic Sedan":
      return img2;
    case "First Class":
      return img5;
    case "Suv":
      return img3;
    case "Suv Luxuray":
      return img4;
    default:
      return null;
  }
}
