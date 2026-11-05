import { ref, unref, watch } from 'vue';
import { resolveFoodPhoto } from '../lib/foodPhotoResolver.js';

export function useFoodPhoto(foodSource) {
  const photo = ref(null), loading = ref(false), failed = ref(false);
  let requestId = 0;
  async function load(force = false) {
    const food = unref(typeof foodSource === 'function' ? foodSource() : foodSource);
    const id = ++requestId;
    photo.value = null; failed.value = false; loading.value = !!food && !food.image;
    if (!food) { loading.value = false; return; }
    try {
      photo.value = await resolveFoodPhoto(food, {force});
      failed.value = !photo.value;
    } catch {
      failed.value = true;
    } finally {
      if (id === requestId) loading.value = false;
    }
  }
  watch(() => unref(typeof foodSource === 'function' ? foodSource() : foodSource)?.key, () => load(), {immediate: true});
  return {photo, loading, failed, retry: () => load(true)};
}
