const SignUpPage = () => {
  return (
    <div className="SignUpPage">
      <form>
        <h2>S'inscrire</h2>
        <input type="text" placeholder="Nom d'utilisateur" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Mot de passe" />
        <div className="chek">
          <input type="checkbox" name="check" />
          <label>S'insrire à notre newsletter</label>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes et
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button>S'inscrire</button>
        <span>Tu as déjà un compte ? Connecte-toi !</span>
      </form>
    </div>
  );
};

export default SignUpPage;
