/*
  Actions for importer module
*/

import Vue from 'vue'
import commonActions from '@/store/common/actions'

export default {
  ...commonActions,
  setCsvFieldNames ({ commit }, fieldNames) {
    commit('SET_CSV_FIELD_NAMES', fieldNames)
  },
  setBindings ({ commit }, bindings) {
    commit('SET_DB_TO_CSV_BINDINGS', bindings)
  },
  setCsvFileRef ({ commit }, ref) {
    commit('SET_CSV_FILE_REF', ref)
  },
  setImagesZipRef ({ commit }, ref) {
    commit('SET_IMAGES_ZIP_FILE_REF', ref)
  },
  async saveNewProfile ({ commit, state }, name) {
    try {
      await Vue.$api.importer.saveProfile({
        name,
        profile: state.profile
      })

      commit('SAVE_NEW_PROFILE', name)
      commit('SET_CURRENT_PROFILE_NAME', name)
    }
    catch (e) {
      console.log(e)
      alert('error on profile saving!')
    }
  },
  setStockStatusRewriteRule ({ commit }, rule) {
    commit('SET_STOCK_STATUS_REWRITE_RULE', rule)
  },
  setStatusRewriteRule ({ commit }, rule) {
    commit('SET_STATUS_REWRITE_RULE', rule)
  },
  setAttributeParser ({ commit }, parser) {
    commit('SET_ATTRIBUTE_PARSER', parser)
  },
  setAttributeParserData ({ commit }, data) {
    commit('SET_ATTRIBUTE_PARSER_DATA', data)
  },
  async saveAllProfiles ({ commit }, profiles) {
    await Vue.$api.importer.saveProfiles(profiles)

    commit('CLEAR_ALL_PROFILES')
    commit('SET_PROFILES', profiles)
  }
}
