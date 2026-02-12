
# Implementing SSL Pinning with OkHttp and Retrofit

 Implementing SSL pinning with OkHttp (and by extension with Retrofit, which uses OkHttp as its networking layer) involves configuring OkHttp to trust a specific certificate or public key instead of the default system trust store.

## Step 1: Obtain the Certificate

You need the certificate in `.crt` or `.pem` format. You can get it using tools like OpenSSL or by exporting it from a
browser.

Example command to fetch the certificate from a domain:

```bash
echo | openssl s_client -showcerts -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -outform PEM > server.crt
```

## **Step 2: Convert the Certificate to a Format OkHttp Understands**

OkHttp uses the `CertificatePinner` class to pin SSL certificates. The certificate needs to be in `.pem` format (Base64
encoded).

## **Step 3: Create the Certificate Pinner Configuration in OkHttp**

Here's how you can set up SSL pinning with OkHttp:

```kotlin
// Create a CertificatePinner object
val certificatePinner = CertificatePinner.Builder()
    .add(
        "example.com",
        "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
    ) // Replace with your certificate's SHA-256 hash
    .build()

// Create an OkHttpClient and set the CertificatePinner
val okHttpClient = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .build()
```

To generate the correct hash, use the following command:

```bash
openssl x509 -pubkey -noout -in server.crt | openssl pkey -pubin -outform DER | openssl dgst -sha256 -binary | base64
```

This command generates the Base64 encoded hash that you will place in the `CertificatePinner` setup.

## **Step 4: Use the OkHttpClient in Retrofit**

Integrate the OkHttpClient with Retrofit:

```kotlin
val retrofit = Retrofit.Builder()
    .baseUrl("https://example.com/")
    .client(okHttpClient)
    .addConverterFactory(GsonConverterFactory.create())
    .build()

val apiService = retrofit.create(ApiService::class.java)
```

### **Full Example Implementation with OkHttp and Retrofit:**

```kotlin
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

fun createRetrofitInstance(): Retrofit {
    // Pin the server's certificate
    val certificatePinner = CertificatePinner.Builder()
        .add("example.com", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
        .build()

    // Build the OkHttpClient with the CertificatePinner
    val okHttpClient = OkHttpClient.Builder()
        .certificatePinner(certificatePinner)
        .build()

    // Build and return the Retrofit instance
    return Retrofit.Builder()
        .baseUrl("https://example.com/")
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
}

// Usage example
val retrofit = createRetrofitInstance()
val apiService = retrofit.create(ApiService::class.java)
```

### **Things to Note:**

- The string `"sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="` should be replaced with your certificate’s correct
  SHA-256 hash.
- You can pin multiple certificates if needed by calling `.add()` multiple times in the `CertificatePinner` builder.

### **Handling SSL Pinning Errors**

When the pinned certificate doesn't match, OkHttp will throw an exception, and the connection will be blocked. This
prevents man-in-the-middle (MITM) attacks, where an attacker tries to intercept or manipulate traffic.

### **Conclusion**

SSL pinning with OkHttp and Retrofit adds a layer of security to your Android app by ensuring that only a specific
certificate or public key is trusted. This protects your app against MITM attacks, ensuring secure communication between
the app and your server.