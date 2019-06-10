<template>
  <div>
    <template v-if="type === 'hidden'">
      <hidden-input @data-changed="formDataChanged" @data-removed="$emit('data-removed', $event)" :form-data="formData" :config="config" :index="index" :default-value="defaultValue" :placeholder="placeholder" :validationMessage="validationMessage" />
    </template>
    <template v-if="type === 'date'">
      <date-input @data-changed="formDataChanged" @data-removed="$emit('data-removed', $event)" :form-data="formData" :config="config" :index="index" :default-value="defaultValue" :placeholder="placeholder" :validationMessage="validationMessage" />
    </template>
    <template v-if="type === 'text'">
      <text-input @data-changed="formDataChanged" @data-removed="$emit('data-removed', $event)" :form-data="formData" :config="config" :index="index" :default-value="defaultValue" :placeholder="placeholder" :validationMessage="validationMessage" />
    </template>
    <template v-if="type === 'number'">
      <number-input @data-changed="formDataChanged" @data-removed="$emit('data-removed', $event)" :form-data="formData" :config="config" :index="index" :default-value="defaultValue" :placeholder="placeholder" :validationMessage="validationMessage" />
    </template>
    <template v-if="type === 'select'">
      <select-input @data-changed="formDataChanged" @data-removed="$emit('data-removed', $event)" :form-data="formData" :config="config" :index="index" :default-value="defaultValue" :placeholder="placeholder" :validationMessage="validationMessage" />
    </template>
    <template v-if="type === 'select2'">
      <select2-input @data-changed="formDataChanged" @data-removed="$emit('data-removed', $event)" :form-data="formData" :config="config" :index="index" :default-value="defaultValue" :placeholder="placeholder" :validationMessage="validationMessage" />
    </template>
    <template v-if="type === 'table'">
      <table-input @data-changed="formDataChanged" @data-removed="$emit('data-removed', $event)" :form-data="formData" :config="config" :index="index" :validationMessage="validationMessage" />
    </template>
    <text-area-input v-else-if="type === 'textarea'" @data-changed="formDataChanged" @data-removed="$emit('data-removed', $event)"  :form-data="formData" :config="config" :default-value="defaultValue" :index="index" :placeholder="placeholder" :validationMessage="validationMessage" />
  </div>
</template>
<script>
import SelectInput from './SelectInput'
import Select2Input from './Select2Input'
import TextAreaInput from './TextAreaInput'
import TableInput from './TableInput'
import HiddenInput from './HiddenInput'
import DateInput from './DateInput'
import NumberInput from './NumberInput'
import TextInput from './TextInput'
export default {
  name: 'InputType',
  components: {
    SelectInput,
    Select2Input,
    TextAreaInput,
    TableInput,
    HiddenInput,
    DateInput,
    NumberInput,
    TextInput
  },
  props: {
    index: { type: String, required: true },
    type: String,
    config: Object,
    validationMessage: Object,
    formData: Object,
    defaultValue: [Number, String],
    placeholder: String
  },
  methods: {
    formDataChanged(index, value){
      this.$emit('data-changed', index, value)
    },
  }
}
</script>
