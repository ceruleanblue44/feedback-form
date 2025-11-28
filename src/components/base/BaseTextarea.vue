<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	label: {
		type: String,
		default: '',
	},
	error: {
		type: String,
		default: '',
	},
	name: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	autocomplete: {
		type: String,
		default: '',
	},
	rows: {
		type: Number,
		default: 4,
	},
})

const emit = defineEmits(['update:modelValue', 'input', 'blur'])

const id = computed(
	() =>
		props.name ||
		props.label ||
		'textarea-' + Math.random().toString(36).slice(2)
)
</script>

<template>
	<div class="base-textarea base-input">
		<label :for="id" v-if="label">{{ label }}</label>
		<textarea
			:id="id"
			:value="modelValue"
			:placeholder="placeholder"
			:rows="rows"
			:class="{ 'has-error': error }"
			@input="
				$emit('update:modelValue', $event.target.value),
					$emit('input', $event.target.value)
			"
			@blur="$emit('blur', $event.target.value)"></textarea>
		<p v-if="error" class="error">{{ error }}</p>
	</div>
</template>
