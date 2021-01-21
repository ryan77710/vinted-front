const LoginPage = () => {
  return (
    <div className="LoginPage">
      <form>
        <h2>Se connecter</h2>
        <input type="text" placeholder="Adresse email" />
        <input type="text" placeholder="Mot de passe" />
        <button>Se connecter</button>
        <span>Pas encore de compte ? Inscris-toi !</span>
      </form>
    </div>
  );
};

export default LoginPage;
