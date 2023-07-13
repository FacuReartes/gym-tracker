import axios from "axios";

const url = "http://localhost:4000/api/categories"

async function BuscarPorId(cat) {
  const resp = await axios.get(url + "/" + cat);
  return resp.data;
}

export const categoriesService = {
  BuscarPorId
};

