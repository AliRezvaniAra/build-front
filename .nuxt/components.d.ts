
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const EditorElementsRender: typeof import("../app/components/editorElements/Render.vue")['default']
export const EditorElementsRenderHeader: typeof import("../app/components/editorElements/RenderHeader.vue")['default']
export const EditorElementsRenderHeaderMobile: typeof import("../app/components/editorElements/RenderHeaderMobile.vue")['default']
export const EditorElementsContainerBox: typeof import("../app/components/editorElements/containerBox.vue")['default']
export const EditorElementsElementsAdvancedDesktopSlider: typeof import("../app/components/editorElements/elements/AdvancedDesktopSlider.vue")['default']
export const EditorElementsElementsAdvancedSlider: typeof import("../app/components/editorElements/elements/AdvancedSlider.vue")['default']
export const EditorElementsElementsBackgroundAndGradientCard: typeof import("../app/components/editorElements/elements/BackgroundAndGradientCard.vue")['default']
export const EditorElementsElementsCategories: typeof import("../app/components/editorElements/elements/Categories.vue")['default']
export const EditorElementsElementsDynamicTable: typeof import("../app/components/editorElements/elements/DynamicTable.vue")['default']
export const EditorElementsElementsGradientCard: typeof import("../app/components/editorElements/elements/GradientCard.vue")['default']
export const EditorElementsElementsImageFeature: typeof import("../app/components/editorElements/elements/ImageFeature.vue")['default']
export const EditorElementsElementsLightGradientFullContent: typeof import("../app/components/editorElements/elements/LightGradientFullContent.vue")['default']
export const EditorElementsElementsLightGradientFullContentReverse: typeof import("../app/components/editorElements/elements/LightGradientFullContentReverse.vue")['default']
export const EditorElementsElementsProduct: typeof import("../app/components/editorElements/elements/Product.vue")['default']
export const EditorElementsElementsProducts: typeof import("../app/components/editorElements/elements/Products.vue")['default']
export const EditorElementsElementsProductsAndCategories: typeof import("../app/components/editorElements/elements/ProductsAndCategories.vue")['default']
export const EditorElementsElementsProductsByIds: typeof import("../app/components/editorElements/elements/ProductsByIds.vue")['default']
export const EditorElementsElementsPurchaseModal: typeof import("../app/components/editorElements/elements/PurchaseModal.vue")['default']
export const EditorElementsElementsSimpleCard: typeof import("../app/components/editorElements/elements/SimpleCard.vue")['default']
export const EditorElementsElementsTeam: typeof import("../app/components/editorElements/elements/Team.vue")['default']
export const EditorElementsElementsCommonABreak: typeof import("../app/components/editorElements/elements/common/ABreak.vue")['default']
export const EditorElementsElementsCommonACard: typeof import("../app/components/editorElements/elements/common/ACard.vue")['default']
export const EditorElementsElementsCommonACol: typeof import("../app/components/editorElements/elements/common/ACol.vue")['default']
export const EditorElementsElementsCommonAContainer: typeof import("../app/components/editorElements/elements/common/AContainer.vue")['default']
export const EditorElementsElementsCommonADivider: typeof import("../app/components/editorElements/elements/common/ADivider.vue")['default']
export const EditorElementsElementsCommonARow: typeof import("../app/components/editorElements/elements/common/ARow.vue")['default']
export const EditorElementsElementsCommonFlex: typeof import("../app/components/editorElements/elements/common/Flex.vue")['default']
export const EditorElementsElementsCommonSpacer: typeof import("../app/components/editorElements/elements/common/Spacer.vue")['default']
export const EditorElementsElementsFavAndbasketIcons: typeof import("../app/components/editorElements/elements/favAndbasketIcons.vue")['default']
export const EditorElementsElementsHeadersHeader1: typeof import("../app/components/editorElements/elements/headers/header1.vue")['default']
export const EditorElementsElementsHeadersHeader1Mobile: typeof import("../app/components/editorElements/elements/headers/header1Mobile.vue")['default']
export const EditorElementsElementsModernSlider: typeof import("../app/components/editorElements/elements/modernSlider.vue")['default']
export const EditorElementsElementsTileImage: typeof import("../app/components/editorElements/elements/tileImage.vue")['default']
export const EditorElementsRenderForm: typeof import("../app/components/editorElements/renderForm.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyEditorElementsRender: LazyComponent<typeof import("../app/components/editorElements/Render.vue")['default']>
export const LazyEditorElementsRenderHeader: LazyComponent<typeof import("../app/components/editorElements/RenderHeader.vue")['default']>
export const LazyEditorElementsRenderHeaderMobile: LazyComponent<typeof import("../app/components/editorElements/RenderHeaderMobile.vue")['default']>
export const LazyEditorElementsContainerBox: LazyComponent<typeof import("../app/components/editorElements/containerBox.vue")['default']>
export const LazyEditorElementsElementsAdvancedDesktopSlider: LazyComponent<typeof import("../app/components/editorElements/elements/AdvancedDesktopSlider.vue")['default']>
export const LazyEditorElementsElementsAdvancedSlider: LazyComponent<typeof import("../app/components/editorElements/elements/AdvancedSlider.vue")['default']>
export const LazyEditorElementsElementsBackgroundAndGradientCard: LazyComponent<typeof import("../app/components/editorElements/elements/BackgroundAndGradientCard.vue")['default']>
export const LazyEditorElementsElementsCategories: LazyComponent<typeof import("../app/components/editorElements/elements/Categories.vue")['default']>
export const LazyEditorElementsElementsDynamicTable: LazyComponent<typeof import("../app/components/editorElements/elements/DynamicTable.vue")['default']>
export const LazyEditorElementsElementsGradientCard: LazyComponent<typeof import("../app/components/editorElements/elements/GradientCard.vue")['default']>
export const LazyEditorElementsElementsImageFeature: LazyComponent<typeof import("../app/components/editorElements/elements/ImageFeature.vue")['default']>
export const LazyEditorElementsElementsLightGradientFullContent: LazyComponent<typeof import("../app/components/editorElements/elements/LightGradientFullContent.vue")['default']>
export const LazyEditorElementsElementsLightGradientFullContentReverse: LazyComponent<typeof import("../app/components/editorElements/elements/LightGradientFullContentReverse.vue")['default']>
export const LazyEditorElementsElementsProduct: LazyComponent<typeof import("../app/components/editorElements/elements/Product.vue")['default']>
export const LazyEditorElementsElementsProducts: LazyComponent<typeof import("../app/components/editorElements/elements/Products.vue")['default']>
export const LazyEditorElementsElementsProductsAndCategories: LazyComponent<typeof import("../app/components/editorElements/elements/ProductsAndCategories.vue")['default']>
export const LazyEditorElementsElementsProductsByIds: LazyComponent<typeof import("../app/components/editorElements/elements/ProductsByIds.vue")['default']>
export const LazyEditorElementsElementsPurchaseModal: LazyComponent<typeof import("../app/components/editorElements/elements/PurchaseModal.vue")['default']>
export const LazyEditorElementsElementsSimpleCard: LazyComponent<typeof import("../app/components/editorElements/elements/SimpleCard.vue")['default']>
export const LazyEditorElementsElementsTeam: LazyComponent<typeof import("../app/components/editorElements/elements/Team.vue")['default']>
export const LazyEditorElementsElementsCommonABreak: LazyComponent<typeof import("../app/components/editorElements/elements/common/ABreak.vue")['default']>
export const LazyEditorElementsElementsCommonACard: LazyComponent<typeof import("../app/components/editorElements/elements/common/ACard.vue")['default']>
export const LazyEditorElementsElementsCommonACol: LazyComponent<typeof import("../app/components/editorElements/elements/common/ACol.vue")['default']>
export const LazyEditorElementsElementsCommonAContainer: LazyComponent<typeof import("../app/components/editorElements/elements/common/AContainer.vue")['default']>
export const LazyEditorElementsElementsCommonADivider: LazyComponent<typeof import("../app/components/editorElements/elements/common/ADivider.vue")['default']>
export const LazyEditorElementsElementsCommonARow: LazyComponent<typeof import("../app/components/editorElements/elements/common/ARow.vue")['default']>
export const LazyEditorElementsElementsCommonFlex: LazyComponent<typeof import("../app/components/editorElements/elements/common/Flex.vue")['default']>
export const LazyEditorElementsElementsCommonSpacer: LazyComponent<typeof import("../app/components/editorElements/elements/common/Spacer.vue")['default']>
export const LazyEditorElementsElementsFavAndbasketIcons: LazyComponent<typeof import("../app/components/editorElements/elements/favAndbasketIcons.vue")['default']>
export const LazyEditorElementsElementsHeadersHeader1: LazyComponent<typeof import("../app/components/editorElements/elements/headers/header1.vue")['default']>
export const LazyEditorElementsElementsHeadersHeader1Mobile: LazyComponent<typeof import("../app/components/editorElements/elements/headers/header1Mobile.vue")['default']>
export const LazyEditorElementsElementsModernSlider: LazyComponent<typeof import("../app/components/editorElements/elements/modernSlider.vue")['default']>
export const LazyEditorElementsElementsTileImage: LazyComponent<typeof import("../app/components/editorElements/elements/tileImage.vue")['default']>
export const LazyEditorElementsRenderForm: LazyComponent<typeof import("../app/components/editorElements/renderForm.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
