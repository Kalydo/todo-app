class AuthencationService{
    registerSuccessfulLogin(username,password){
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
        sessionStorage.setItem('authenticatedPassword', password)
    }

    logout(){
        console.log('logout')
        sessionStorage.removeItem('authenticatedUser')
        sessionStorage.removeItem('authenticatedPassword')
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        if (user===null) return false;
        return true;
    }

}

export default new AuthencationService()