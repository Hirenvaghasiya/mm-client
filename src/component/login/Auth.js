const Auth = {
  isAunthenticate: false,

  authenticate() {
    this.isAunthenticate = true;
  },

  signout() {
    localStorage.removeItem("isAuthenticated")
    this.isAunthenticate = false;
  },

  getAuth() {
    return this.isAunthenticate;
  },
};

export default Auth;
