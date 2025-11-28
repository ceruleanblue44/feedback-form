import { ref } from 'vue'

export function useFormSteps() {
  const step = ref(1)

  const nextStep = () => (step.value = 2)
  const prevStep = () => (step.value = 1)

  return { step, nextStep, prevStep }
}