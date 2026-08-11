
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

interface _GlobalComponents {
  EditorElementsRender: typeof import("../../app/components/editorElements/Render.vue")['default']
  EditorElementsRenderHeader: typeof import("../../app/components/editorElements/RenderHeader.vue")['default']
  EditorElementsRenderHeaderMobile: typeof import("../../app/components/editorElements/RenderHeaderMobile.vue")['default']
  EditorElementsContainerBox: typeof import("../../app/components/editorElements/containerBox.vue")['default']
  EditorElementsElementsAdvancedDesktopSlider: typeof import("../../app/components/editorElements/elements/AdvancedDesktopSlider.vue")['default']
  EditorElementsElementsAdvancedSlider: typeof import("../../app/components/editorElements/elements/AdvancedSlider.vue")['default']
  EditorElementsElementsBackgroundAndGradientCard: typeof import("../../app/components/editorElements/elements/BackgroundAndGradientCard.vue")['default']
  EditorElementsElementsCategories: typeof import("../../app/components/editorElements/elements/Categories.vue")['default']
  EditorElementsElementsDynamicTable: typeof import("../../app/components/editorElements/elements/DynamicTable.vue")['default']
  EditorElementsElementsGradientCard: typeof import("../../app/components/editorElements/elements/GradientCard.vue")['default']
  EditorElementsElementsImageFeature: typeof import("../../app/components/editorElements/elements/ImageFeature.vue")['default']
  EditorElementsElementsLightGradientFullContent: typeof import("../../app/components/editorElements/elements/LightGradientFullContent.vue")['default']
  EditorElementsElementsLightGradientFullContentReverse: typeof import("../../app/components/editorElements/elements/LightGradientFullContentReverse.vue")['default']
  EditorElementsElementsProduct: typeof import("../../app/components/editorElements/elements/Product.vue")['default']
  EditorElementsElementsProducts: typeof import("../../app/components/editorElements/elements/Products.vue")['default']
  EditorElementsElementsProductsAndCategories: typeof import("../../app/components/editorElements/elements/ProductsAndCategories.vue")['default']
  EditorElementsElementsProductsByIds: typeof import("../../app/components/editorElements/elements/ProductsByIds.vue")['default']
  EditorElementsElementsPurchaseModal: typeof import("../../app/components/editorElements/elements/PurchaseModal.vue")['default']
  EditorElementsElementsSimpleCard: typeof import("../../app/components/editorElements/elements/SimpleCard.vue")['default']
  EditorElementsElementsTeam: typeof import("../../app/components/editorElements/elements/Team.vue")['default']
  EditorElementsElementsCommonABreak: typeof import("../../app/components/editorElements/elements/common/ABreak.vue")['default']
  EditorElementsElementsCommonACard: typeof import("../../app/components/editorElements/elements/common/ACard.vue")['default']
  EditorElementsElementsCommonACol: typeof import("../../app/components/editorElements/elements/common/ACol.vue")['default']
  EditorElementsElementsCommonAContainer: typeof import("../../app/components/editorElements/elements/common/AContainer.vue")['default']
  EditorElementsElementsCommonADivider: typeof import("../../app/components/editorElements/elements/common/ADivider.vue")['default']
  EditorElementsElementsCommonARow: typeof import("../../app/components/editorElements/elements/common/ARow.vue")['default']
  EditorElementsElementsCommonFlex: typeof import("../../app/components/editorElements/elements/common/Flex.vue")['default']
  EditorElementsElementsCommonSpacer: typeof import("../../app/components/editorElements/elements/common/Spacer.vue")['default']
  EditorElementsElementsFavAndbasketIcons: typeof import("../../app/components/editorElements/elements/favAndbasketIcons.vue")['default']
  EditorElementsElementsHeadersHeader1: typeof import("../../app/components/editorElements/elements/headers/header1.vue")['default']
  EditorElementsElementsHeadersHeader1Mobile: typeof import("../../app/components/editorElements/elements/headers/header1Mobile.vue")['default']
  EditorElementsElementsModernSlider: typeof import("../../app/components/editorElements/elements/modernSlider.vue")['default']
  EditorElementsElementsTileImage: typeof import("../../app/components/editorElements/elements/tileImage.vue")['default']
  EditorElementsRenderForm: typeof import("../../app/components/editorElements/renderForm.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
  NuxtPicture: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyEditorElementsRender: LazyComponent<typeof import("../../app/components/editorElements/Render.vue")['default']>
  LazyEditorElementsRenderHeader: LazyComponent<typeof import("../../app/components/editorElements/RenderHeader.vue")['default']>
  LazyEditorElementsRenderHeaderMobile: LazyComponent<typeof import("../../app/components/editorElements/RenderHeaderMobile.vue")['default']>
  LazyEditorElementsContainerBox: LazyComponent<typeof import("../../app/components/editorElements/containerBox.vue")['default']>
  LazyEditorElementsElementsAdvancedDesktopSlider: LazyComponent<typeof import("../../app/components/editorElements/elements/AdvancedDesktopSlider.vue")['default']>
  LazyEditorElementsElementsAdvancedSlider: LazyComponent<typeof import("../../app/components/editorElements/elements/AdvancedSlider.vue")['default']>
  LazyEditorElementsElementsBackgroundAndGradientCard: LazyComponent<typeof import("../../app/components/editorElements/elements/BackgroundAndGradientCard.vue")['default']>
  LazyEditorElementsElementsCategories: LazyComponent<typeof import("../../app/components/editorElements/elements/Categories.vue")['default']>
  LazyEditorElementsElementsDynamicTable: LazyComponent<typeof import("../../app/components/editorElements/elements/DynamicTable.vue")['default']>
  LazyEditorElementsElementsGradientCard: LazyComponent<typeof import("../../app/components/editorElements/elements/GradientCard.vue")['default']>
  LazyEditorElementsElementsImageFeature: LazyComponent<typeof import("../../app/components/editorElements/elements/ImageFeature.vue")['default']>
  LazyEditorElementsElementsLightGradientFullContent: LazyComponent<typeof import("../../app/components/editorElements/elements/LightGradientFullContent.vue")['default']>
  LazyEditorElementsElementsLightGradientFullContentReverse: LazyComponent<typeof import("../../app/components/editorElements/elements/LightGradientFullContentReverse.vue")['default']>
  LazyEditorElementsElementsProduct: LazyComponent<typeof import("../../app/components/editorElements/elements/Product.vue")['default']>
  LazyEditorElementsElementsProducts: LazyComponent<typeof import("../../app/components/editorElements/elements/Products.vue")['default']>
  LazyEditorElementsElementsProductsAndCategories: LazyComponent<typeof import("../../app/components/editorElements/elements/ProductsAndCategories.vue")['default']>
  LazyEditorElementsElementsProductsByIds: LazyComponent<typeof import("../../app/components/editorElements/elements/ProductsByIds.vue")['default']>
  LazyEditorElementsElementsPurchaseModal: LazyComponent<typeof import("../../app/components/editorElements/elements/PurchaseModal.vue")['default']>
  LazyEditorElementsElementsSimpleCard: LazyComponent<typeof import("../../app/components/editorElements/elements/SimpleCard.vue")['default']>
  LazyEditorElementsElementsTeam: LazyComponent<typeof import("../../app/components/editorElements/elements/Team.vue")['default']>
  LazyEditorElementsElementsCommonABreak: LazyComponent<typeof import("../../app/components/editorElements/elements/common/ABreak.vue")['default']>
  LazyEditorElementsElementsCommonACard: LazyComponent<typeof import("../../app/components/editorElements/elements/common/ACard.vue")['default']>
  LazyEditorElementsElementsCommonACol: LazyComponent<typeof import("../../app/components/editorElements/elements/common/ACol.vue")['default']>
  LazyEditorElementsElementsCommonAContainer: LazyComponent<typeof import("../../app/components/editorElements/elements/common/AContainer.vue")['default']>
  LazyEditorElementsElementsCommonADivider: LazyComponent<typeof import("../../app/components/editorElements/elements/common/ADivider.vue")['default']>
  LazyEditorElementsElementsCommonARow: LazyComponent<typeof import("../../app/components/editorElements/elements/common/ARow.vue")['default']>
  LazyEditorElementsElementsCommonFlex: LazyComponent<typeof import("../../app/components/editorElements/elements/common/Flex.vue")['default']>
  LazyEditorElementsElementsCommonSpacer: LazyComponent<typeof import("../../app/components/editorElements/elements/common/Spacer.vue")['default']>
  LazyEditorElementsElementsFavAndbasketIcons: LazyComponent<typeof import("../../app/components/editorElements/elements/favAndbasketIcons.vue")['default']>
  LazyEditorElementsElementsHeadersHeader1: LazyComponent<typeof import("../../app/components/editorElements/elements/headers/header1.vue")['default']>
  LazyEditorElementsElementsHeadersHeader1Mobile: LazyComponent<typeof import("../../app/components/editorElements/elements/headers/header1Mobile.vue")['default']>
  LazyEditorElementsElementsModernSlider: LazyComponent<typeof import("../../app/components/editorElements/elements/modernSlider.vue")['default']>
  LazyEditorElementsElementsTileImage: LazyComponent<typeof import("../../app/components/editorElements/elements/tileImage.vue")['default']>
  LazyEditorElementsRenderForm: LazyComponent<typeof import("../../app/components/editorElements/renderForm.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
