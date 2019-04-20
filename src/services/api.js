import axios from 'axios';

const key = process.env.REACT_APP_API_IMAGE_KEY || ''
const url = process.env.REACT_APP_API_IMAGE_URL || ''
const api_url = process.env.REACT_APP_API || ''

const headers = {
  'Ocp-Apim-Subscription-Key': key
}

const API = axios.create({
  baseURL: api_url
})

export default API

export const signin = (data) => {
  return API({
    method: 'POST',
    url: '/signin',
    data
  })
}

export const signup = (data) => {
  return API({
    method: 'POST',
    url: '/signup',
    data
  })
}

export const searchImageCar = (model = '', branch = '') => {
  return API({
    method: 'GET',
    url: `${url}?q=${model}%20${branch}%20carro&count=15`,
    headers
  })
};

export const searchBrand = (brand) => {
  brand = brand.length > 2 ? brand.trim() : brand
  return API({
    method: 'GET',
    url: `/brands?search=${brand}`,
    headers
  })
}

export const searchModel = (brand, model) => {
  brand = brand.length > 2 ? brand.trim() : brand
  model = model.length > 2 ? model.trim() : model
  return API({
    method: 'GET',
    url: `/models?brand=${brand}&search=${model}`,
    headers
  })
}
