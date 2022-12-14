import axios from "axios";

export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "5fchxn5m8hbo6jcxiq3xddofodoacskye";
  this._table = "";
  this._custom = "";
  this._method = "";
  const secret_key =
    "cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };

  this.login = async function (payload) {
    try {
      const response = await axios.post(
        this._baseurl + "/v2/api/lambda/login",
        {
          email: payload.email,
          password: payload.password,
          role: payload.role,
        },
        {
          headers: {
            "x-project": secret_key,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  this.getHeader = function () {
    return {
      authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };

  this.callRestAPI = async function ({ payload, method }) {
    const header = {
      "Content-Type": "application/json",
      "x-project": this.secret_key,
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    switch (method) {
      case "GET":
        const getResult = await axios.post(
          `https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE`,
          {
            payload: {},
            page: payload.page,
            limit: payload.limit,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),

              "x-project":
                "cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==",
              "Content-Type": "application/json",
            },
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        console.log(jsonGet);
        return jsonGet;

      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      default:
        break;
    }
  };

  this.check = async function (role) {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      this._baseurl + "/v2/api/lambda/check",
      {
        role: "admin",
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-project": secret_key,
        },
      }
    );
    return response.data.message;
  };

  return this;
}
