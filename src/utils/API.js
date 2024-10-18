import axios from "axios";

const BASEURL =
  "https://api.data.charitynavigator.org/v2/Organizations?app_id=3c0fc420&app_key=0c12428e18e7fb50a1af2d2a834c2eaf&pageSize=25&search=";

const BASEURL_CAMPAIGN = 'https://donate-backend-alpha.vercel.app/api/campaigns';
const BASEURL_USER = 'https://donate-backend-alpha.vercel.app/api';

// const BASEURL_CAMPAIGN = 'http://localhost:4000/api/campaigns';
// const BASEURL_USER = 'http://localhost:4000/api';

export default {
  searchnews: function (query) {
    return axios.get(
      "http://newsapi.org/v2/top-headlines?q=" +
        query +
        "&apiKey=20ebd079386145bf8ef379ea799efbf4"
    );
  },
  search: function (charity) {
    return axios.get(BASEURL + charity + "&rated=true");
  },

  saveCharity: function (charityData) {
    return axios.post("/api/search", charityData);
  },

  getCharities: function (charity) {
    return axios.get(`/api/search/${charity || ""}`);
  },

  deleteCharity: function (id) {
    return axios.delete("/api/search/" + id);
  },

  saveCampaign: function (campaignData) {
    return axios.post(BASEURL_CAMPAIGN + "/create", campaignData);
  },

  updateCampaign: function(id, campaignData) {
    return axios.put(BASEURL_CAMPAIGN + '/update/' + id, campaignData);
  },

  getAllCampaigns: function() {
    return axios.get(BASEURL_CAMPAIGN + '/all')
  },

  getAllPendingCampaigns: function() {
    return axios.get(BASEURL_CAMPAIGN + '/pending')
  },

  getCampaignById: function(id) {
    return axios.get(BASEURL_CAMPAIGN + '/' + id);
  },

  donateToCampaign: function(id, donationData) {
    return axios.post(BASEURL_CAMPAIGN + "/donate/" + id, donationData)
  },

  addCommentInCampaign: function(id, commentData) {
    return axios.post(BASEURL_CAMPAIGN + "/comment/" + id, commentData)
  },

  getCampaignComments: function(id) {
    return axios.get(BASEURL_CAMPAIGN + "/comments/" + id)
  },

  approveCampaign: function(id) {
    return axios.put(BASEURL_CAMPAIGN + "/approve/" + id);
  },

  rejectCampaign: function(id) {
    return axios.put(BASEURL_CAMPAIGN + "/reject/" + id);
  },

  registerUser: function(userDetails) {
    return axios.post(BASEURL_USER + '/register', userDetails)
  },

  login: function(userData) {
    return axios.post(BASEURL_USER + '/login', userData)
  },

  getFilteredCampaigns: function(recipientType) {
    return axios.get(`${BASEURL_CAMPAIGN}/filtered?recipientType=${recipientType}`);
  },

  addUpdateInCampaign: function(id, updateData) {
    return axios.post(BASEURL_CAMPAIGN + "/updates/" + id, updateData)
  },

};
