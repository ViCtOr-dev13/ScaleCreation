import {
  Image,
  Linkedin,
  Newspaper,
  Mail,
  Sparkles,
  Wand2,
  FileImage,
  FileJson,
} from "lucide-react";

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];

export const fonts = [
  "serif",
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const CIRCLE_OPTIONS = {
  radius: 225,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 200,
  height: 200,
  angle: 0,
  rx: 0, // Horizontal corner radius
  ry: 0, // Vertical corner radius
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
  rx: 0, // Horizontal corner radius
  ry: 0, // Vertical corner radius
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
  rx: 0, // Horizontal corner radius
  ry: 0, // Vertical corner radius
};

export const TEXT_OPTIONS = {
  left: 100, // X position
  top: 100, // Y position
  fontFamily: "serif", // Font family
  fill: "#333333", // Text color
  selectable: true, // Allow selection and editing
  fontStyle: "normal",
  linethrough: false,
  underline: false,
  textAlign: "left",
};
import NewsletterEditor from '@/components/editor/NewsletterEditor';
import LinkedinEditor from '@/components/editor/LinkedinEditor';
import EmailEditor from '@/components/editor/EmailEditor';
import GeneratorEditor from '@/components/editor/GeneratorEditor';

export const designTypes = [
  {
    icon: Newspaper,
    label: "Newsletter",
    bgColor: "text-green-500",
    width: 794,
    height: 1123,
    editor: "NewsletterEditor",
  },
  {
    icon: Linkedin,
    label: "LinkedIn Post",
    bgColor: "text-red-400",
    width: 1200,
    height: 1500,
    editor: "LinkedinEditor",
  },
  {
    icon: Mail,
    label: "Emailing",
    bgColor: "text-pink-500",
    width: 500,
    height: 1500,
    editor: "EmailEditor",
  },
  {
    icon: Image,
    label: "Logo Design",
    bgColor: "text-purple-500",
    width: 500,
    height: 500,
    editor: "GeneratorEditor",
  },
  {
    icon: Sparkles,
    label: "AI Background",
    bgColor: "text-blue-600",
    width: 700,
    height: 500,
    editor: "GeneratorEditor",
  },
  {
    icon: Wand2,
    label: "AI Image Gen",
    bgColor: "text-violet-600",
    width: 700,
    height: 500,
    editor: "GeneratorEditor",
  },
];

export const exportFormats = [
  {
    id: "png",
    name: "PNG Image",
    icon: FileImage,
  },
  {
    id: "jpeg",
    name: "JPEG Image",
    icon: FileImage,
  },
  {
    id: "webp",
    name: "WEBP Image",
    icon: FileImage,
  },
  // {
  //   id: "pdf",
  //   name: "PDF Document",
  //   icon: File,
  // },
  {
    id: "json",
    name: "JSON Template",
    icon: FileJson,
  },
];
