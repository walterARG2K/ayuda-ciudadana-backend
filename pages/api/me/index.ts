import type { NextApiRequest, NextApiResponse } from "next";
import Method from "micro-method-router";
import * as yup from "yup";
import { middleware } from "../../../lib/middleware";
import { getUserInfo, updateUserInfo } from "../../../controllers/user";

type Data = {
  message: any;
};

const bodySchema = yup.object().shape({
  full_name: yup.string().required(),
});

const get = async (req: NextApiRequest, res: NextApiResponse<Data>, userId: number) => {
  try {
    const response = await getUserInfo(userId);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const patch = async (req: NextApiRequest, res: NextApiResponse<Data>, userId: number) => {
  try {
    const { full_name } = await bodySchema.validate(req.body);
    const response = await updateUserInfo({ full_name }, userId);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

function options(req: NextApiRequest, res: NextApiResponse) {
  res.send(200);
}

export default Method({ get: middleware(get), patch: middleware(patch), options });
