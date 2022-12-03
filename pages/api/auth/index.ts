import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "../../../controllers/auth";
import Method from "micro-method-router";
import * as yup from "yup";

type Data = {
  message: any;
};

const bodySchema = yup.object().shape({
  email: yup.string().email().required(),
});

const post = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { email } = await bodySchema.validate(req.body);
    const response = await sendCode({ full_name: "", email });
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default Method({ post });
