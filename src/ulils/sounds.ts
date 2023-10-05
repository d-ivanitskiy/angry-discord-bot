import fs from "fs"
import path from "path"

export const getSound = (sound: any) => {
  let array: any = []

  fs.readdirSync(path.join(__dirname, "../sounds")).forEach(dir => {
    if (dir !== ".DS_Store") {
      const files = fs.readdirSync(path.join(__dirname, `../sounds/${dir}`)).filter(f => f.endsWith(".mp4") || f.endsWith(".mp3"));
      files.forEach((file: any) => {
        array.push({
          name: file.split(".")[0],
          file: `${dir}/${file}`
        });
      });
    }
  });

  const Sound = array.find((c: any) => c.name === sound);

  return Sound || false;
}
