export const isAValidString =(value:any,maxLength:number = 15):boolean=>{
    if(!value || typeof value !== 'string' )return false;

    if(value.length <= 4 || value.length >= maxLength)return false;
    return true;
}

export const isValidEmail = (email:any):boolean=>{

   const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegex.test(email);
}

export const checkIsAValidNumber = (value:any):boolean=>{
   if (typeof value === 'boolean') return false;

  const number = Number(value);

  if (
    value === null ||
    value === undefined ||
    value === '' ||
    isNaN(number) ||
    number <= 0
  ) {
    return false;
  }

  return true;
}

export const categories = [
  "Roupas",
  "Eletrônicos",
  "Livros",
  "Brinquedos",
  "Beleza",
  "Esporte",
  "Automotivo",
  "Cozinha",
  "Celulares",
  "Informática",
  "Jardim",
  "Petshop",
  "Mercearia"
];
const normalizeString = (str: string) =>
  str.normalize("NFD")             
     .replace(/[\u0300-\u036f]/g, "") 
     .toLowerCase();
     
export const checkIsAValidCategory = (category:string)=>{
 const normalizedInput = normalizeString(category);

  return categories.some(cat => normalizeString(cat) === normalizedInput);
}

