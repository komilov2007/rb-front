export const URL_REGEX =
  /^((http|https):\/\/)([\w\?[a-zA-Z-_%\/@?.]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/

export const WEBSITE_DOMAIN_REGEX = /^(?!:\/\/)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,6}$/
export const WEBSITE_SUB_DOMAIN_REGEX = /^(?:([a-zA-Z0-9-]{1,63}))*$/
