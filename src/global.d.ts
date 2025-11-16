export {}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: any) => void
            context?: 'signin' | 'signup'
            ux_mode?: 'popup' | 'redirect'
            auto_select?: boolean
            itp_support?: boolean
            use_fedcm_for_prompt?: boolean
          }) => void

          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black'
              size?: 'small' | 'medium' | 'large'
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
              shape?: 'rectangular' | 'pill' | 'circle' | 'square'
              logo_alignment?: 'left' | 'center'
            }
          ) => void

          prompt: () => void
        }
      }
    }

    handleSignInWithGoogle?: (response: any) => void
    handleSignUpWithGoogle?: (response: any) => void
  }
}
