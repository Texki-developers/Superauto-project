import authService from "../services/auth.service";

class authController {
    loginController = (req: Request, res: Response)=>{
        const body = req.body
        authService.loginService(body)
    }
}

export default new authController();
