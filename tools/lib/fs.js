
import glob from 'glob'
import rimraf from 'rimraf'

export const readDir = (pattern, options) =>
  new Promise((resolve, reject) => {
    glob(
      pattern,
      options,
      (err, result) => (err? reject(err) : resolve(result))
    )
  });

export const cleanDir = (pattern, options) =>
  new Promise((resolve, reject)=>{
    rimraf(
      pattern,
      { glob: options },
      (err, result) => (err? reject(err) : resolve(result))
    )
  });

export default {
  readDir,
  cleanDir,
}