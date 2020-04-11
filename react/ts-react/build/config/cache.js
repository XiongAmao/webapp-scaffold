const cacheLoader = {
  loader: 'cache-loader',
  // options: {

  // }
}

const threadLoader = (workerParallelJobs) => {
  const options = {
    workerParallelJobs,
    poolTimeout: 2000,
  }

  return { loader: 'thread-loader', options }
}

module.exports = {
  cacheLoader,
  threadLoader
}
