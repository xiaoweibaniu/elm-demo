module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/v1": {
        target: "http://cangdu.org:8001"
      }
    }
  }
};
