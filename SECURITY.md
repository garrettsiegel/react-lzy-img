# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.5.x   | :white_check_mark: |
| < 0.5   | :x:                |

## Reporting a Vulnerability

We take the security of react-lzy-img seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:

- Open a public GitHub issue for security vulnerabilities
- Discuss the vulnerability in public forums, social media, or chat platforms

### Please DO:

**Report security vulnerabilities privately** using one of these methods:

1. **GitHub Security Advisory** (Preferred)
   - Go to the [Security Advisories page](https://github.com/garrettsiegel/react-lzy-img/security/advisories)
   - Click "Report a vulnerability"
   - Fill in the details

2. **Email**
   - Send details to: [security contact - add your email]
   - Use subject line: `[SECURITY] react-lzy-img: Brief Description`

### What to Include

Please provide as much information as possible:

- **Type of vulnerability** (XSS, injection, memory leak, etc.)
- **Full paths of source file(s)** related to the vulnerability
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact assessment** - what an attacker could achieve
- **Suggested fix** (if you have one)

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Update**: Within 5 business days
- **Resolution Timeline**: Varies by severity
  - Critical: 7 days
  - High: 14 days
  - Medium: 30 days
  - Low: 90 days

### Our Commitment

We will:

1. **Acknowledge receipt** of your vulnerability report
2. **Investigate** the issue and determine its impact
3. **Keep you informed** about our progress
4. **Notify you** when the issue is fixed
5. **Credit you** in release notes (if desired)
6. **Coordinate disclosure** timing with you

### Security Update Process

When we release a security fix:

1. We'll publish a patch release
2. Update CHANGELOG.md with security notice
3. Publish a GitHub Security Advisory
4. Notify users through GitHub releases
5. Update npm package

### Security Best Practices for Users

When using react-lzy-img:

1. **Keep Updated**: Always use the latest version
2. **Review Dependencies**: Regularly audit your dependencies
3. **Validate Image URLs**: Ensure image sources are from trusted domains
4. **Content Security Policy**: Configure CSP headers appropriately
5. **Alt Text**: Never include sensitive information in alt text
6. **Error Messages**: Avoid exposing sensitive info in custom error messages

### Known Security Considerations

#### Image Source Validation

The component accepts user-provided URLs through the `src` prop. While browsers have built-in protections against malicious image URLs, you should:

- Validate and sanitize image URLs on your server
- Use allowlists for image domains when possible
- Consider using a CDN with signed URLs

#### Canvas API

The component uses Canvas API for blurhash rendering. This is generally safe, but:

- Ensure your Content Security Policy allows canvas usage
- Be aware that canvas fingerprinting is a privacy concern (though not exploitable through this component)

#### Third-Party Dependencies

We minimize dependencies to reduce attack surface:

- Only production dependency: `blurhash@^2.0.5`
- Regularly updated via Dependabot
- All dependencies scanned for known vulnerabilities

### Disclosure Policy

We follow **coordinated disclosure**:

- We'll work with you to understand and fix the issue
- We'll coordinate the public disclosure timing
- We prefer 90 days for disclosure, but can be flexible based on severity
- We'll credit security researchers (with permission)

### Security Hall of Fame

We appreciate security researchers who help keep react-lzy-img secure. With their permission, we'll list contributors here:

<!-- Security researchers will be listed here after disclosure -->

---

## Questions?

If you have questions about this security policy or need clarification, please open a general (non-security) issue on GitHub or contact the maintainers.

Thank you for helping keep react-lzy-img and its users safe!
