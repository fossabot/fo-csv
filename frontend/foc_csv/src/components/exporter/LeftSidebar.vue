<template>
  <div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        {{ $t('Main settings') }}
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label class="label label-default">{{ $t('Profile') }}</label>
          <select v-model="currentProfileNameModel" class="form-control">
            <option v-for="(profile, name) in profiles" :key="name">{{ name }}</option>
          </select>
        </div>

        <button @click.prevent="savingProfile = true" class="btn btn-default">
          <i class="fa fa-save"></i> {{ $t('Save profile as') }}
        </button>

        <div v-if="savingProfile" class="input-group">
          <input type="text" :placeholder="$t('Profile name')" ref="newProfileName" :value="currentProfileName" class="form-control">
          <span class="input-group-btn">
            <button @click.prevent="saveNewProfile($refs.newProfileName.value) && (savingProfile = false)" class="btn btn-success">
              <i class="fa fa-check"></i> {{ $t('Save profile') }}</button>
          </span>
        </div>

        <div class="form-group">
          <label for="" class="label label-default">{{ $t('Store') }}</label>
          <select v-model="store" class="form-control">
            <option v-for="(store, idx) in stores" :key="idx" :value="store.id">{{ store.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="" class="label label-default">{{ $t('Language') }}</label>
          <select v-model="language" class="form-control">
            <option v-for="(lang, idx) in languages" :key="idx" :value="lang.id">{{ lang.name }}</option>
          </select>
        </div>
      </div>
    </div>

    <images-export-settings></images-export-settings>
  </div>
</template>

<script>
import { mapVuexModels } from 'vuex-models'
import { createNamespacedHelpers } from 'vuex'
import ImagesExportSettings from './ImagesExportSettings'

const { mapGetters, mapActions } = createNamespacedHelpers('exporter')

export default {
  components: {
    ImagesExportSettings
  },
  data () {
    return {
      savingProfile: false
    }
  },
  computed: {
    currentProfileNameModel: {
      get () {
        return this.currentProfileName
      },
      set (name) {
        this.setCurrentProfileName(name)
      }
    },
    ...mapVuexModels([
      'profile',
      'store',
      'language'
    ], 'exporter'),
    ...mapGetters([
      'currentProfileName',
      'profiles',
      'stores',
      'languages'
    ])
  },
  methods: {
    ...mapActions([
      'saveNewProfile',
      'setCurrentProfileName'
    ])
  }
}
</script>
