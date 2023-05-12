import postModel from '../models/postModel.js';

/**
 * 
@desc Получение всех статей
 */
export const getAll = async (req, res) => {
  try {
    const allPosts = await postModel.find().populate('user').exec();
    res.json(allPosts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить список статей',
    });
  }
};

/**
 * 
@desc Создание статьи
 */
export const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;
    const newPost = new postModel({
      title: title,
      description: description,
      user: userId,
    });

    const post = await newPost.save();
    res.json({ post });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось создать пост',
    });
  }
};

/**
 * 
@desc Удаление статьи
 */
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await postModel.findOneAndDelete({ _id: postId });
    if (!result) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }
    res.json({
      message: 'Статья успешно удалена',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};

/**
 * 
@desc Получение одной статьи
 */
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await postModel
      .findOneAndUpdate({ _id: postId }, { $inc: { viewsCount: 1 } }, { returnDocument: 'after' })
      .populate('user', 'username')
      .exec();
    if (!result) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

/**
 * 
@desc Изменение статьи
 */
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await postModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        description: req.body.description,
      },
    );
    res.json({
      message: 'Статья успешно изменена',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};
