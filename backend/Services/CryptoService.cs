using System.Security.Cryptography;
using System.Text;

public class CryptoService
{
    // Guarde isso em variável de ambiente, NUNCA no código!
    private readonly string _key ;
    private readonly string _iv ;
     public CryptoService(IConfiguration config)
    {
        _key = config["Crypto:Key"];
        _iv  = config["Crypto:IV"];
    }

    public string Encrypt(string plainText)
    {
        using var aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(_key); // 32 chars = 256 bits
        aes.IV  = Encoding.UTF8.GetBytes(_iv);  // 16 chars

        var encryptor = aes.CreateEncryptor();
        var bytes = Encoding.UTF8.GetBytes(plainText);
        var encrypted = encryptor.TransformFinalBlock(bytes, 0, bytes.Length);

        return Convert.ToBase64String(encrypted);
    }

    public string Decrypt(string cipherText)
    {
        using var aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(_key);
        aes.IV  = Encoding.UTF8.GetBytes(_iv);

        var decryptor = aes.CreateDecryptor();
        var bytes = Convert.FromBase64String(cipherText);
        var decrypted = decryptor.TransformFinalBlock(bytes, 0, bytes.Length);

        return Encoding.UTF8.GetString(decrypted);
    }
}