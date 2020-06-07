import { ADD_COMMENT, DEL_COMMENT } from "./constants";
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  data: comment,
});
export const delComment = (id) => ({
  type: DEL_COMMENT,
  data: id,
});
