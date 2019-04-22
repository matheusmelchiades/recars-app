import axios from 'axios';

const api_url = process.env.REACT_APP_API || 'http://192.168.0.15:5000'

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
    url: `/images?search=${model}%20${branch}`,
  })
};

export const searchBrand = (brand) => {
  brand = brand.length > 2 ? brand.trim() : brand
  return API({
    method: 'GET',
    url: `/brands?search=${brand}`,
  })
}

export const searchModel = (brand, model) => {
  brand = brand.length > 2 ? brand.trim() : brand
  model = model.length > 2 ? model.trim() : model
  return API({
    method: 'GET',
    url: `/models?brand=${brand}&search=${model}`,
  })
}

export const createCase = (oneCase) => {
  return API({
    method: 'POST',
    url: '/cases',
    data: { oneCase }
  })
}

export const getAttributes = () => {
  return API({
    method: 'GET',
    url: '/attributes/createCase',
  })
}

export const getPendencies = () => {
  return API({
    method: 'GET',
    url: '/cases/pending'
  })
}

export const approvePendencies = (data) => {
  return API({
    method: 'POST',
    url: '/cases/pending',
    data
  })
}
