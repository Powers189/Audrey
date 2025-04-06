
    const files = await fs.readdir(folderPath);
    console.log("path", folderPath);
    const images = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(folderPath, file);
        const metadata = await exifr.parse(filePath);
        return {
          src: `/images/${file}`,
          metadata: {
            name: file,