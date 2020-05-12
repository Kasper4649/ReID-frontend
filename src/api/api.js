import request from './axios';

const query = ({ files }) => request.post('query', { files });
const search = ({ file }) => request.post('search', { file });

export default {
  query,
  search,
};
