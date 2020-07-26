import axios from "axios";
import qs from "qs";

export const URL = "https://floating-crag-38613.herokuapp.com";


export const register = (newUser) => {
  return axios
    .post(
      URL + "/users/register",
      qs.stringify({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
      }),
      {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      }
    )
    .then((response) => {
      console.log("Registered");
      return response; //changes
    })
    .catch((response) => {
      return response;
    });
};

export const socialLogin = (newUser) => {
  return axios.post(
    URL + "/users/social_login",
    qs.stringify({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
    }),
    {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
  );
};

export const login = (user) => {
  return axios
    .post(
      URL + "/users/login",
      qs.stringify({
        email: user.email,
        password: user.password,
      }),
      {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      }
    )
    .then((response) => {
      if (response.data.error == undefined)
        localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const forgotPassword = (email) => {
  return axios.put(
    URL + "/users/forgot-password",
    qs.stringify({
      email: email,
    }),
    {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
  );
};

export const resetPage = (password, token) => {
  return axios.put(
    URL + "/users/resetpassword",
    qs.stringify({
      newPass: password,
      resetLink: token,
    }),
    {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
  );
};

export const deleteUser = (token) => {
  return axios.get(URL + "/users/delete", {
    headers: {
      authorization: token,
    },
  });
};

export const authUser = (token) => {
  return axios.post(
    URL + "/users/authenticate",
    qs.stringify({
      token: token,
    }),
    {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
  );
};


export const shortUrl = (token,url) => {
  return axios.post(
    URL + "/users/shortUrls",
    qs.stringify({
      token: token,
      fullUrl:url
    }),
    {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
  );
};

export const getList = (token) => {
  return axios
    .post(  URL +'/users/urlhistory', qs.stringify({
      token: token
    })
    )
    .then(res => {
      return res.data
    })
}

export const shortdirect = (url) => {
  return axios
    .get(  URL +'/users/'+url,{
      header:{
        'Access-Control-Allow-Origin':'*'
    }
    }
    );
}