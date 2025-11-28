<script setup>
import { useResponsive } from '../composables/useResponsive'
import { useFormSteps } from '../composables/useFormStep'
import { useValidation } from '../composables/useValidation'
import StarRating from '../components/StarRating.vue'
import QuickReplies from '../components/QuickReplies.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseSelect from '../components/base/BaseSelect.vue'
import BaseTextarea from '../components/base/BaseTextarea.vue'
import ProgressBar from '../components/ProgressBar.vue'
import FormButtons from '../components/FormButtons.vue'
import SuccessScreen from '../components/SuccessScreen.vue'
import ErrorScreen from '../components/ErrorScreen.vue'
import FeedbackHeader from '../components/FeedbackHeader.vue'

const { isMobile } = useResponsive()
const { step, nextStep, prevStep } = useFormSteps()
const {
	form,
	errors,
	formSubmitted,
	showErrorScreen,
	showValidation,
	onInput,
	onBlur,
	submitForm,
	resetForm,
	backToForm,
	onKeydown,
	onSelectInput,
} = useValidation(isMobile, step)

const hideOnStep = (stepToHide) => isMobile.value && step.value === stepToHide
</script>

<template>
	<div class="feedback">
		<button class="close-btn"></button>

		<template v-if="formSubmitted">
			<SuccessScreen :onReset="resetForm" v-if="!showErrorScreen" />
			<ErrorScreen :onBackToForm="backToForm" v-else />
		</template>

		<template v-else>
			<FeedbackHeader />
			<transition name="fade-step" mode="out-in">
				<div :key="step">
					<StarRating
						:class="{ 'hide-xs': hideOnStep(1) }"
						v-model="form.rating" />

					<QuickReplies
						:class="{ 'hide-xs': hideOnStep(1) }"
						:rating="form.rating"
						v-model="form.quickReplies" />

					<form class="form-grid">
						<BaseInput
							:class="{ 'hide-xs': hideOnStep(2) }"
							v-model="form.name"
							label="ФИО"
							name="name"
							:showValidation="showValidation"
							:error="errors.name"
							placeholder="Иван Иванов"
							autocomplete="name"
							@input="onInput('name', $event)"
							@blur="onBlur('name', $event)" />

						<BaseInput
							:class="{ 'hide-xs': hideOnStep(2) }"
							v-model="form.email"
							label="Почта"
							name="email"
							:showValidation="showValidation"
							:error="errors.email"
							placeholder="Текст"
							autocomplete="email"
							@input="onInput('email', $event)"
							@blur="onBlur('email', $event)" />

						<BaseInput
							:class="{ 'hide-xs': hideOnStep(2) }"
							v-model="form.phone"
							label="Номер телефона"
							name="phone"
							@keydown="onKeydown"
							:showValidation="showValidation"
							:error="errors.phone"
							autocomplete="tel"
							placeholder="+7 (000) 000 00 00"
							@input="onInput('phone', $event)"
							@blur="onBlur('phone', $event)" />

						<BaseSelect
							:class="{ 'hide-xs': hideOnStep(1) }"
							v-model="form.level"
							label="Грейд"
							:showValidation="showValidation"
							:error="errors.level"
							@blur="onBlur('level', $event)"
							@input="onSelectInput" />

						<BaseTextarea
							:class="{ 'hide-xs': hideOnStep(1) }"
							v-model="form.more"
							label="Дополнительная информация"
							name="more"
							placeholder="Что понравилось и не понравилось"
							autocomplete="off"
							@input="() => (errors.more = '')" />
					</form>
				</div>
			</transition>
			<div class="feedback__footer">
				<ProgressBar :step="step" :form="form" v-if="isMobile" />

				<FormButtons
					:isMobile="isMobile"
					:step="step"
					:handleReset="resetForm"
					@nextStep="nextStep"
					@prevStep="prevStep"
					@submitForm="submitForm" />
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
.form-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 1.75rem;
}

.form-grid .base-textarea {
	grid-column: 1 / -1;
	max-width: 100%;
}

.fade-step-enter-active,
.fade-step-leave-active {
	transition: opacity .25s ease;
}
.fade-step-enter-from,
.fade-step-leave-to {
	opacity: 0;
}
</style>
