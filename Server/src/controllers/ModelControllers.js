import File from "../model/FIleModel.js";
import GenerateFunction from "../services/GeneratePassword.js";



// create a text and save it into the DB
export const createTextAndSaveToDb = async (req, res) => {
    try {
        const { text } = req.body;
        const newFile = new File({
            textContent: text,
            passwordCode: GenerateFunction(),
            imageUrl: null,
        })
        await newFile.save();
        res.send({
            message: "Text created successfully",
            passwordCode: newFile.passwordCode
        });
    }
    catch (error) {
        console.log(error);
        res.send("Error creating text");
    }
}

// get info to the current user
export const getInfo = async (req, res) => {
    try {
        const file = await File.find();
        res.send(file);
    } catch (error) {
        console.log(error);
        res.send("Error getting info");
    }
};


export const getContentByPassword = async (req, res) => {
  try {
    const { passwordCode } = req.body;
    console.log("Received:", passwordCode); 

    const file = await File.findOne({ passwordCode });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "Invalid password",
      });
    }

    console.log("Matched data:", file); 
    return res.status(200).json({
      success: true,
      data: file, // Return all content of the password document
      textContent: file.textContent,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error getting content",
    });
  }
};


// automatically delete from DB after 120Sec
export const deleteFile = async (req, res) => {
    try {
        const { passwordCode } = req.body;
        const file = await File.findOne({ passwordCode });
        if (!file) {
            return res.send("file not found")
        }
        await File.deleteOne({ passwordCode });
        res.send("File deleted successfully");
    } catch (error) {
        console.log(error)
        res.send("Error deleting file")
    }
}
