const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const GENERATED_DIR = path.join(ROOT, "generated_by_checklist");
const AI_BANK_PATH = path.join(ROOT, "ai_question_bank.js");
const CHECKLIST_PATH = path.join(ROOT, "official_question_checklist.md");
const RESOURCE_DATA_PATH = path.join(ROOT, "resource_data.js");
const FORMAT_PATH = path.join(ROOT, "event_competition_formats.md");

const CYBERSECURITY_APPEND = [
  {
    q: "Which security tool is designed to store and generate unique passwords for many accounts?",
    options: ["Password manager", "Packet sniffer", "Hypervisor", "Load balancer"],
    answer: 0,
    explain: "A password manager securely stores credentials and can generate unique passwords, reducing reuse across accounts.",
    optionExplanations: [
      "A password manager stores and generates credentials, which helps reduce reuse and weak passwords.",
      "A packet sniffer captures network traffic and is not intended for password storage.",
      "A hypervisor runs virtual machines and is unrelated to credential management.",
      "A load balancer distributes traffic and does not manage user passwords."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why does network segmentation improve cybersecurity in an organization?",
    options: ["It makes every system publicly reachable.", "It limits how far an attacker can move after one system is compromised.", "It guarantees zero downtime.", "It removes the need for user authentication."],
    answer: 1,
    explain: "Segmenting networks creates boundaries between systems so a compromise in one area is less likely to spread everywhere else.",
    optionExplanations: [
      "Public reachability increases exposure and is the opposite of the security benefit being tested.",
      "Segmentation limits lateral movement by separating critical systems from less trusted ones.",
      "Segmentation can improve resilience, but it does not guarantee zero downtime.",
      "Authentication is still required even on segmented networks."
    ],
    source: "generated-bespoke"
  },
  {
    q: "A security team wants one place to collect logs from firewalls, servers, and endpoints for correlation and alerting. Which platform best fits this need?",
    options: ["SIEM", "Spreadsheet", "VPN gateway", "Printer server"],
    answer: 0,
    explain: "A SIEM centralizes log collection and analyzes events across many systems to identify suspicious patterns.",
    optionExplanations: [
      "A SIEM is built for centralized logging, correlation, and alerting across security data sources.",
      "A spreadsheet can hold data but does not provide real-time security correlation at scale.",
      "A VPN gateway handles secure connectivity, not enterprise-wide log analysis.",
      "A printer server manages print jobs and is unrelated to security event monitoring."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which statement best describes hashing in cybersecurity?",
    options: ["It converts plaintext to ciphertext that can be decrypted with a key.", "It creates a one-way value used to verify integrity.", "It sends traffic through a secure tunnel.", "It automatically patches vulnerable software."],
    answer: 1,
    explain: "Hashing produces a fixed-length digest used to verify that data has not changed, and it is not designed to be reversed.",
    optionExplanations: [
      "That describes encryption rather than hashing.",
      "Hashing is used for integrity checking because the output changes when the input changes.",
      "Secure tunneling is a VPN or TLS function, not hashing.",
      "Patching addresses vulnerabilities but is unrelated to hashing."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main reason organizations classify data as public, internal, confidential, or restricted?",
    options: ["To choose how strongly each type of data should be protected", "To make file names longer", "To avoid creating backups", "To replace legal compliance requirements"],
    answer: 0,
    explain: "Data classification helps organizations apply the right controls based on the sensitivity and business impact of the information.",
    optionExplanations: [
      "Classification is used to match protection controls to the sensitivity of the data.",
      "Longer file names are unrelated to data classification.",
      "Classification does not remove the need for backups.",
      "Compliance obligations still apply and often influence the classification scheme."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which control best reduces the risk that one employee can both initiate and approve a fraudulent transaction?",
    options: ["Separation of duties", "Single sign-on", "Port forwarding", "Data compression"],
    answer: 0,
    explain: "Separation of duties divides critical tasks among different people so no single person has unchecked control over the whole process.",
    optionExplanations: [
      "Separating sensitive steps among multiple people reduces fraud and abuse risk.",
      "Single sign-on improves usability but does not address approval segregation.",
      "Port forwarding exposes services and is unrelated to internal fraud control.",
      "Compression reduces file size and does not address authorization workflow."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main purpose of endpoint detection and response (EDR) software?",
    options: ["Monitor endpoints for suspicious behavior and support response actions", "Replace all network cabling", "Act as a public website builder", "Increase monitor resolution"],
    answer: 0,
    explain: "EDR tools watch endpoint activity for malicious behavior and help investigators contain and remediate threats on devices.",
    optionExplanations: [
      "EDR focuses on endpoint visibility, detection, investigation, and response.",
      "Cabling is physical infrastructure and not an EDR function.",
      "Website creation is unrelated to endpoint threat detection.",
      "Display resolution has nothing to do with threat response."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which application control allows only explicitly approved software to run on a workstation?",
    options: ["Allowlisting", "Brute forcing", "Mirroring", "Token passing"],
    answer: 0,
    explain: "Allowlisting blocks unapproved programs by permitting only known, trusted applications to execute.",
    optionExplanations: [
      "Allowlisting enforces a list of approved applications and blocks everything else.",
      "Brute forcing is an attack method, not a defense control.",
      "Mirroring copies traffic or data but does not control executable programs.",
      "Token passing is a media-access concept, not an application control."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why is centralized log retention important after a security incident?",
    options: ["It preserves evidence for investigation across multiple systems", "It guarantees the incident cannot happen again", "It makes passwords easier to share", "It automatically restores deleted files"],
    answer: 0,
    explain: "Centralized logs help investigators reconstruct timelines and compare activity across systems even if one host has been compromised.",
    optionExplanations: [
      "Centralized log retention supports forensics because evidence from many systems can be searched together.",
      "Logging helps investigation, but it does not guarantee future prevention.",
      "Sharing passwords is insecure and unrelated to log retention.",
      "File restoration depends on backups, not log aggregation."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which statement best distinguishes business continuity from disaster recovery?",
    options: ["Business continuity focuses on keeping critical operations running, while disaster recovery focuses on restoring systems after disruption.", "Business continuity is only about passwords, while disaster recovery is only about firewalls.", "Business continuity applies only to small companies, while disaster recovery applies only to large ones.", "There is no meaningful difference between them."],
    answer: 0,
    explain: "Business continuity emphasizes maintaining essential services during disruption, while disaster recovery emphasizes restoring technology and data afterward.",
    optionExplanations: [
      "This correctly distinguishes ongoing operations from restoration activities.",
      "Passwords and firewalls are only small parts of a broader resilience strategy.",
      "Both concepts apply to organizations of many sizes.",
      "The two concepts are related but not identical."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is a primary benefit of tokenization for sensitive payment data?",
    options: ["It replaces sensitive values with non-sensitive tokens in many workflows", "It permanently increases internet speed", "It disables access control", "It guarantees immunity from all fraud"],
    answer: 0,
    explain: "Tokenization reduces exposure by substituting sensitive values with tokens that are less useful if intercepted.",
    optionExplanations: [
      "Tokenization reduces the number of systems that directly store sensitive data.",
      "Tokenization does not affect network performance as its primary goal.",
      "Access control remains necessary even when tokenization is used.",
      "No single control guarantees complete fraud prevention."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which hardening principle recommends disabling unnecessary services and features on a server?",
    options: ["Least functionality", "Open trust", "Maximum compatibility", "Shared administration"],
    answer: 0,
    explain: "Least functionality reduces the attack surface by leaving enabled only the services and features actually required.",
    optionExplanations: [
      "Least functionality is the practice of minimizing enabled features and services.",
      "Open trust increases exposure rather than reducing it.",
      "Maximum compatibility is not a security hardening principle.",
      "Shared administration does not describe reducing exposed services."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main security value of DNS filtering?",
    options: ["It blocks requests to known malicious or risky domains", "It replaces file permissions", "It increases battery life on laptops", "It compresses database backups"],
    answer: 0,
    explain: "DNS filtering can stop users and systems from reaching malicious destinations by blocking lookups for risky domains.",
    optionExplanations: [
      "DNS filtering reduces exposure by preventing resolution of suspicious domains.",
      "File permissions are a separate access-control mechanism.",
      "Battery life is not the purpose of DNS filtering.",
      "Backup compression is unrelated to domain-name security controls."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why do many email security programs open suspicious attachments in a sandbox?",
    options: ["To observe potentially malicious behavior in an isolated environment", "To speed up the user's computer", "To permanently delete all attachments automatically", "To disable all macros in every document everywhere"],
    answer: 0,
    explain: "Sandboxing isolates suspicious files so their behavior can be analyzed without directly risking production systems.",
    optionExplanations: [
      "A sandbox lets defenders inspect a file safely before it reaches users or production systems.",
      "Performance improvement is not the main goal.",
      "Sandboxes analyze files; they do not simply delete every attachment.",
      "Macro control may be part of policy, but sandboxing is specifically about isolated execution."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main objective of privileged access management (PAM)?",
    options: ["Control, monitor, and limit use of high-level administrative accounts", "Eliminate all user accounts", "Increase spam email delivery", "Replace network encryption"],
    answer: 0,
    explain: "PAM protects powerful accounts because compromise of privileged credentials can lead to widespread damage.",
    optionExplanations: [
      "PAM focuses on securing elevated accounts through control, approval, monitoring, and credential protection.",
      "Organizations still need user accounts; PAM focuses on privileged ones.",
      "Spam delivery is unrelated to privileged account security.",
      "PAM complements but does not replace encryption."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why do organizations maintain secure baseline configurations for laptops and servers?",
    options: ["To make every device start from an approved hardened state", "To allow any setting change without review", "To remove the need for updates forever", "To guarantee no hardware will ever fail"],
    answer: 0,
    explain: "A secure baseline makes systems more consistent and easier to defend because approved security settings are applied from the start.",
    optionExplanations: [
      "Secure baselines provide a known-good hardened configuration for deployment and auditing.",
      "Unreviewed configuration drift weakens security rather than improving it.",
      "Baselines reduce risk but do not eliminate the need for ongoing patching.",
      "Hardware failure is an operational issue, not something baselines can prevent completely."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which backup characteristic most helps defend against ransomware that tries to encrypt everything it can reach?",
    options: ["Immutability or offline storage", "Public write access", "Unlimited administrator sharing", "Storing backups only on the same local drive"],
    answer: 0,
    explain: "Immutable or offline backups are harder for ransomware to alter, making recovery more reliable after an attack.",
    optionExplanations: [
      "Immutability or offline separation helps preserve clean recovery points.",
      "Public write access makes backups easier for attackers to alter or destroy.",
      "Broad admin sharing increases compromise risk.",
      "Backups on the same local drive can be encrypted or destroyed along with the system."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which MFA method is generally more phishing-resistant than SMS codes?",
    options: ["Hardware security keys using cryptographic challenge-response", "Username only", "A shared office PIN", "Plaintext email approval links"],
    answer: 0,
    explain: "Hardware security keys can resist phishing because the cryptographic response is tied to the legitimate site rather than a lookalike page.",
    optionExplanations: [
      "Security keys are more resistant to phishing than SMS because they validate the real destination.",
      "A username alone is not MFA and provides almost no security by itself.",
      "A shared PIN is weak and not phishing-resistant MFA.",
      "Email approval links can still be abused in phishing scenarios."
    ],
    source: "generated-bespoke"
  },
  {
    q: "An account logs in from Ohio and then from another country five minutes later. What detection concept does this most strongly suggest?",
    options: ["Impossible travel alerting", "Disk defragmentation", "Patch rollback", "Cable testing"],
    answer: 0,
    explain: "Impossible travel detections flag logins that appear physically impossible within the observed time interval, which may indicate account compromise.",
    optionExplanations: [
      "Impossible travel logic is used to spot suspicious location changes inconsistent with real-world travel.",
      "Disk defragmentation is a storage maintenance task, not an authentication alert.",
      "Patch rollback reverses software updates and is unrelated here.",
      "Cable testing checks wiring and has nothing to do with login anomalies."
    ],
    source: "generated-bespoke"
  },
  {
    q: "How does a penetration test differ most clearly from a vulnerability scan?",
    options: ["A penetration test actively attempts to exploit weaknesses to demonstrate impact, while a vulnerability scan mainly identifies likely weaknesses.", "A vulnerability scan requires no software, while a penetration test requires only a web browser.", "They are identical terms for the same activity.", "A vulnerability scan is always manual, while a penetration test is always automatic."],
    answer: 0,
    explain: "Vulnerability scans identify likely issues, while penetration tests go further by validating whether weaknesses can actually be exploited.",
    optionExplanations: [
      "This correctly distinguishes identification from exploitation-based validation.",
      "Both activities can use specialized tools and are not defined that way.",
      "They are related but not identical practices.",
      "Either can include manual and automated techniques depending on scope."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the best immediate containment step when an endpoint is confirmed to be actively communicating with known malware infrastructure?",
    options: ["Isolate the device from the network", "Share the device with more users to confirm the problem", "Delete all audit logs", "Wait until the end of the week to investigate"],
    answer: 0,
    explain: "Isolating the affected device can stop further command-and-control traffic and reduce the chance of spread while investigation begins.",
    optionExplanations: [
      "Isolation is a standard containment action when a system is actively compromised.",
      "Sharing the device increases exposure and does not help containment.",
      "Deleting logs destroys evidence needed for investigation.",
      "Delaying action gives the attacker more time to operate."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main purpose of data loss prevention (DLP) technology?",
    options: ["Detect and restrict unauthorized movement of sensitive data", "Improve screen brightness on laptops", "Replace secure coding practices", "Increase Wi-Fi range"],
    answer: 0,
    explain: "DLP tools watch for sensitive information leaving approved channels and can alert, block, or quarantine risky transfers.",
    optionExplanations: [
      "DLP focuses on identifying and controlling risky movement of sensitive data.",
      "Display brightness is unrelated to information protection.",
      "Secure coding is still required even if DLP is deployed.",
      "Wi-Fi range is a networking issue, not a DLP objective."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why are software dependency inventories or SBOMs useful in cybersecurity?",
    options: ["They help teams identify where vulnerable third-party components are in use", "They automatically remove all bugs from software", "They replace code reviews entirely", "They eliminate the need for patch testing"],
    answer: 0,
    explain: "A software bill of materials helps defenders quickly find impacted systems when a library or package vulnerability is disclosed.",
    optionExplanations: [
      "SBOMs help organizations locate vulnerable components inside their software and respond faster.",
      "They document components, but they do not automatically fix vulnerabilities.",
      "Code review remains important because SBOMs serve a different purpose.",
      "Patch validation is still necessary even when component inventories exist."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why should firewall rule changes usually follow a documented change-management process?",
    options: ["To reduce accidental exposure and keep a review trail", "To make the network slower on purpose", "To prevent all employees from accessing printers", "To avoid writing down any technical decision"],
    answer: 0,
    explain: "Firewall changes can expose critical systems if made incorrectly, so review, approval, and documentation reduce risk and improve accountability.",
    optionExplanations: [
      "Controlled review and documentation reduce errors and provide an audit trail for sensitive network changes.",
      "Performance reduction is not the purpose of change management.",
      "Printer access is unrelated to why firewall governance exists.",
      "Change management requires more documentation, not less."
    ],
    source: "generated-bespoke"
  },
  {
    q: "A browser warns that a website certificate does not match the site name being visited. What is the safest response?",
    options: ["Stop and verify the site instead of proceeding", "Ignore the warning because HTTPS is always safe", "Enter credentials quickly before the warning returns", "Disable browser security checks permanently"],
    answer: 0,
    explain: "A certificate mismatch can indicate a spoofed site, misconfiguration, or interception risk, so the user should stop and verify the destination.",
    optionExplanations: [
      "Stopping to verify the site is the safest response to a certificate-name mismatch.",
      "HTTPS warnings can indicate serious trust problems and should not be ignored.",
      "Entering credentials during a trust warning increases the chance of compromise.",
      "Disabling browser checks removes a key safety control."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why should service-account passwords or secrets be rotated and stored securely?",
    options: ["Because long-lived exposed credentials increase the blast radius of compromise", "Because it makes login prompts appear more often for customers", "Because it removes the need for logging", "Because it guarantees that secrets will never be stolen"],
    answer: 0,
    explain: "Service-account secrets are powerful and often overlooked, so rotation and secure storage reduce the time an exposed credential remains useful to an attacker.",
    optionExplanations: [
      "Rotating and protecting service credentials reduces persistence opportunities for attackers.",
      "Customer login frequency is not the main reason for secret rotation.",
      "Logging is still needed to detect misuse.",
      "No control can guarantee a credential is never exposed."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which control is most directly aimed at preventing a former employee from using old credentials after leaving the company?",
    options: ["Timely account deprovisioning", "Higher screen brightness", "File compression", "Extra browser tabs"],
    answer: 0,
    explain: "Account deprovisioning removes access when employment ends, closing a common gap that can leave old credentials active.",
    optionExplanations: [
      "Deprovisioning promptly removes access that should no longer exist.",
      "Screen brightness has no effect on access control.",
      "Compression reduces file size and is unrelated to account removal.",
      "Browser tabs do not control whether a departed user still has credentials."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main purpose of tabletop incident-response exercises?",
    options: ["Practice decision-making and communication before a real incident occurs", "Increase malware infection rates for realism", "Replace all written incident procedures", "Permanently disable production systems"],
    answer: 0,
    explain: "Tabletop exercises let teams rehearse roles, escalation paths, and decisions in a low-risk setting before a real event tests them.",
    optionExplanations: [
      "Tabletop exercises improve readiness by practicing coordination and decision-making.",
      "They simulate incidents conceptually rather than causing real infections.",
      "Written procedures are still needed and should be improved using exercise results.",
      "Production shutdown is not the goal of a tabletop exercise."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which principle is most relevant when an employee can read salary records but cannot modify them?",
    options: ["Read-only authorization based on role", "Open anonymous access", "Unrestricted administrator rights", "No logging requirement"],
    answer: 0,
    explain: "Read-only authorization is a role-based control that permits necessary access while preventing unauthorized changes to sensitive data.",
    optionExplanations: [
      "Role-based read-only permissions enforce least privilege while preserving integrity.",
      "Anonymous access would expose sensitive records to unauthorized users.",
      "Administrator rights exceed what is needed in this scenario.",
      "Logging remains important when sensitive data is accessed."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which secure-development practice helps catch security issues before software reaches production?",
    options: ["Code review and security testing in the development pipeline", "Removing all version control history", "Sharing production passwords in chat", "Waiting until after a breach to inspect the code"],
    answer: 0,
    explain: "Review and security testing during development can detect flaws earlier, when they are cheaper and safer to fix.",
    optionExplanations: [
      "Secure reviews and testing in the pipeline shift security checks earlier in the lifecycle.",
      "Deleting history reduces traceability and does not improve code security.",
      "Sharing production passwords creates additional risk.",
      "Waiting until after a breach is reactive and far more costly."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main security purpose of secret scanning in source-code repositories?",
    options: ["Detect accidentally committed credentials or tokens", "Increase code compilation speed", "Replace access control lists", "Compress large binaries automatically"],
    answer: 0,
    explain: "Secret scanning helps identify exposed API keys, passwords, and tokens before attackers can misuse them.",
    optionExplanations: [
      "Secret scanning looks for exposed sensitive values such as API keys and access tokens in code repositories.",
      "Compilation speed is unrelated to credential exposure in source control.",
      "Access control lists govern permissions but do not search repositories for leaked secrets.",
      "Binary compression is unrelated to detecting exposed credentials."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which principle best matches a zero-trust security model?",
    options: ["Never assume users or devices are trusted solely because they are inside the network", "Trust all internal traffic permanently after one successful login", "Disable logging to improve privacy", "Allow unrestricted administrator access by default"],
    answer: 0,
    explain: "Zero trust requires continuous verification of identity, device state, and context rather than assuming the internal network is automatically safe.",
    optionExplanations: [
      "Zero trust is based on explicit verification instead of automatic trust from network location.",
      "Permanent trust after a single login conflicts with zero-trust principles.",
      "Logging is still important in zero-trust environments for monitoring and investigation.",
      "Default unrestricted admin access violates least privilege and zero trust."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main purpose of network access control (NAC) in an enterprise?",
    options: ["Check whether connecting devices meet security requirements before granting network access", "Convert all wired traffic to wireless automatically", "Replace all endpoint antivirus software", "Increase printer toner efficiency"],
    answer: 0,
    explain: "NAC helps enforce policy by assessing device identity or posture before allowing access to the network.",
    optionExplanations: [
      "NAC evaluates device or user conditions before permitting access to network resources.",
      "Wired-to-wireless conversion is not the purpose of NAC.",
      "NAC can work alongside endpoint protection but does not replace it.",
      "Printer supply management is unrelated to network admission control."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why might a security team deploy a honeypot?",
    options: ["To attract and study attacker behavior in a controlled environment", "To speed up approved user logins", "To permanently replace production databases", "To disable all network encryption"],
    answer: 0,
    explain: "A honeypot is a decoy system used to detect, delay, or observe attackers without exposing primary production assets.",
    optionExplanations: [
      "Honeypots are decoys designed to attract malicious activity for observation or early warning.",
      "They are not intended to speed up normal user access.",
      "Production databases hold real business data and are not replaced by honeypots.",
      "Encryption controls remain important and are unrelated to honeypot purpose."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main value of tamper-evident or immutable logging?",
    options: ["It makes unauthorized log changes harder to hide during an investigation", "It removes the need to review alerts", "It guarantees all attacks are prevented", "It replaces backup systems entirely"],
    answer: 0,
    explain: "Tamper-evident logging helps investigators trust that recorded events were not silently altered after a compromise.",
    optionExplanations: [
      "Immutable or tamper-evident logs preserve evidence integrity during forensic review.",
      "Analysts still need to review logs and alerts even if the records are protected.",
      "No logging method can guarantee prevention of every attack.",
      "Backups and logs serve different operational and security purposes."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why is certificate revocation checking useful in secure communications?",
    options: ["It helps identify certificates that should no longer be trusted", "It compresses TLS traffic to save bandwidth", "It speeds up password resets", "It removes the need for certificate expiration dates"],
    answer: 0,
    explain: "Revocation checking can detect certificates that were compromised or invalidated before their normal expiration date.",
    optionExplanations: [
      "Revocation mechanisms help clients reject certificates that have been invalidated early.",
      "Certificate revocation does not exist to compress encrypted traffic.",
      "Password reset workflows are separate from certificate trust checks.",
      "Certificates still need expiration dates even when revocation is supported."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which practice best protects data on a drive being retired or reassigned?",
    options: ["Secure wiping or destruction of the storage media", "Renaming the files and keeping them in place", "Disconnecting the monitor cable", "Turning the computer off for one day"],
    answer: 0,
    explain: "Sensitive data can remain recoverable after ordinary deletion, so secure wiping or destruction is needed before disposal or reuse.",
    optionExplanations: [
      "Secure wipe or physical destruction is used to prevent recovery of residual sensitive data.",
      "Renaming files does not remove the underlying data from the drive.",
      "Monitor cables do not control whether data remains on storage media.",
      "Powering off a device does not securely erase stored information."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Why is accurate time synchronization important in cybersecurity operations?",
    options: ["It helps correlate logs and events across systems during investigations", "It increases keyboard typing speed", "It permanently blocks phishing emails", "It replaces user awareness training"],
    answer: 0,
    explain: "Consistent timestamps help analysts reconstruct incident timelines when evidence comes from many systems.",
    optionExplanations: [
      "Time synchronization makes cross-system log analysis and incident timeline reconstruction more reliable.",
      "Typing speed is unrelated to security event correlation.",
      "Time sync alone does not block phishing.",
      "Awareness training is still required to reduce human risk."
    ],
    source: "generated-bespoke"
  },
  {
    q: "What is the main purpose of browser isolation technology for risky websites?",
    options: ["Render web content in a separated environment so malicious code is less likely to reach the user's device", "Store all browsing history forever on public servers", "Disable all website certificates", "Guarantee that every site is legitimate"],
    answer: 0,
    explain: "Browser isolation reduces endpoint risk by separating web content execution from the local device.",
    optionExplanations: [
      "Isolation keeps potentially dangerous web code away from the user's endpoint environment.",
      "Public history storage is unrelated and would create privacy issues.",
      "Certificates are still needed to validate secure sites.",
      "Isolation reduces risk but cannot guarantee that a site is legitimate."
    ],
    source: "generated-bespoke"
  },
  {
    q: "Which control is most appropriate for stopping unauthorized USB storage devices from copying sensitive files off a workstation?",
    options: ["Device control policy that blocks or restricts removable media", "Increasing monitor brightness", "Using a shorter Ethernet cable", "Adding more browser bookmarks"],
    answer: 0,
    explain: "Device control can restrict removable media usage, reducing the risk of unauthorized copying or malware introduction through USB devices.",
    optionExplanations: [
      "Removable-media controls directly address unauthorized USB storage use.",
      "Brightness has no effect on data exfiltration through peripherals.",
      "Cable length is unrelated to removable media control.",
      "Browser bookmarks do not prevent file copying to USB devices."
    ],
    source: "generated-bespoke"
  }
];

function norm(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function extractJson(raw) {
  const first = raw.indexOf("{");
  const last = raw.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) {
    throw new Error("Could not locate JSON object boundaries");
  }
  return raw.slice(first, last + 1);
}

function escapeInnerQuotes(text) {
  let out = "";
  for (let index = 0; index < text.length; index += 1) {
    const ch = text[index];
    const prev = index > 0 ? text[index - 1] : "";
    if (ch === '"' && prev !== "\\") {
      out += "\\\"";
    } else {
      out += ch;
    }
  }
  return out;
}

function repairJsonText(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("//"))
    .map((line) => {
      const propertyMatch = line.match(/^(\s*"[^"]+"\s*:\s*")(.*)("\s*,?\s*)$/);
      if (propertyMatch) {
        return `${propertyMatch[1]}${escapeInnerQuotes(propertyMatch[2])}${propertyMatch[3]}`;
      }

      if (!line.includes(":")) {
        const arrayStringMatch = line.match(/^(\s*")(.*)("\s*,?\s*)$/);
        if (arrayStringMatch) {
          return `${arrayStringMatch[1]}${escapeInnerQuotes(arrayStringMatch[2])}${arrayStringMatch[3]}`;
        }
      }

      return line;
    })
    .join("\n");
}

function defaultOptionExplanation(options, answer, index) {
  if (index === answer) {
    return `Correct. ${options[index]} best matches the requirement in the question.`;
  }
  return `Not correct here. ${options[index]} does not fit the specific condition described in the question.`;
}

function normalizeQuestion(question, fallbackSource) {
  if (!question || typeof question.q !== "string") {
    return null;
  }

  const prompt = question.q.trim();
  const options = Array.isArray(question.options) ? question.options.slice(0, 4).map((value) => String(value).trim()) : [];
  const answer = Number(question.answer);
  const explain = typeof question.explain === "string" && question.explain.trim()
    ? question.explain.trim()
    : `The correct answer is ${options[answer] || "the marked option"} because it best fits the scenario.`;
  const source = typeof question.source === "string" && question.source.trim()
    ? question.source.trim()
    : fallbackSource;

  if (!prompt || options.length !== 4 || !Number.isInteger(answer) || answer < 0 || answer > 3) {
    return null;
  }

  const optionExplanations = Array.isArray(question.optionExplanations)
    ? question.optionExplanations.slice(0, 4).map((value, index) => {
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
      return defaultOptionExplanation(options, answer, index);
    })
    : options.map((_, index) => defaultOptionExplanation(options, answer, index));

  while (optionExplanations.length < 4) {
    optionExplanations.push(defaultOptionExplanation(options, answer, optionExplanations.length));
  }

  return {
    q: prompt,
    options,
    answer,
    explain,
    optionExplanations,
    source
  };
}

function dedupeQuestions(questions) {
  const seen = new Set();
  const out = [];
  for (const question of questions) {
    const key = norm(question.q);
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push(question);
  }
  return out;
}

function loadLooseJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const jsonText = extractJson(raw);
  const repaired = repairJsonText(jsonText);
  return JSON.parse(repaired);
}

function loadResourceData() {
  const sandbox = { window: {}, console };
  const code = fs.readFileSync(RESOURCE_DATA_PATH, "utf8");
  vm.runInNewContext(code, sandbox, { filename: RESOURCE_DATA_PATH });
  return sandbox.window.RESOURCE_INTERACTIVE_DATA || { objectiveQuizzes: {} };
}

function findBestKey(keys, eventName) {
  const eventNorm = norm(eventName);
  let bestKey = null;
  let bestScore = -1;

  for (const key of keys) {
    const keyNorm = norm(key);
    let score = 0;
    if (keyNorm.includes(eventNorm) || eventNorm.includes(keyNorm)) {
      score += 4;
    }
    const eventWords = new Set(eventNorm.split(" "));
    for (const word of keyNorm.split(" ")) {
      if (word.length > 2 && eventWords.has(word)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  return bestScore >= 2 ? bestKey : null;
}

function getObjectiveEventsInOrder() {
  const lines = fs.readFileSync(FORMAT_PATH, "utf8").split(/\r?\n/);
  const events = [];
  for (const line of lines) {
    const match = line.match(/^\|\s*(.*?)\s*\|\s*(Yes|No)\s*\|/);
    if (match && match[2] === "Yes") {
      events.push(match[1].trim());
    }
  }
  return events;
}

function rewriteGeneratedSources() {
  const resourceData = loadResourceData();
  const hqKeys = Object.keys(resourceData.objectiveQuizzes || {});
  const files = fs.readdirSync(GENERATED_DIR).filter((file) => file.endsWith(".json")).sort();
  const rewritten = [];

  for (const file of files) {
    const filePath = path.join(GENERATED_DIR, file);
    const parsed = loadLooseJson(filePath);
    const eventName = String(parsed.event || path.basename(file, ".json")).trim();
    const normalized = dedupeQuestions((parsed.questions || [])
      .map((question) => normalizeQuestion(question, "generated-bespoke"))
      .filter(Boolean));

    let finalQuestions = normalized;
    if (file === "cybersecurity.json") {
      const hqKey = findBestKey(hqKeys, eventName);
      const hqDeck = dedupeQuestions(((hqKey ? resourceData.objectiveQuizzes[hqKey] : []) || [])
        .map((question) => normalizeQuestion({ ...question, source: "official-hq" }, "official-hq"))
        .filter(Boolean));
      finalQuestions = [...normalized];
      const combinedBeforeExtras = dedupeQuestions([...hqDeck, ...finalQuestions]).length;
      if (combinedBeforeExtras < 100) {
        const extras = CYBERSECURITY_APPEND.map((question) => normalizeQuestion(question, "generated-bespoke")).filter(Boolean);
        const seen = new Set(normalized.map((question) => norm(question.q)));
        for (const extra of extras) {
          if (dedupeQuestions([...hqDeck, ...finalQuestions]).length >= 100) {
            break;
          }
          const key = norm(extra.q);
          if (!seen.has(key)) {
            seen.add(key);
            finalQuestions.push(extra);
          }
        }
      }
      const combined = dedupeQuestions([...hqDeck, ...finalQuestions]).length;
      if (combined < 100) {
        throw new Error(`Cybersecurity rebuild expected at least 100 total combined questions, found ${combined}`);
      }
    }

    const cleanPayload = {
      event: eventName,
      questions: finalQuestions
    };

    fs.writeFileSync(filePath, `${JSON.stringify(cleanPayload, null, 2)}\n`, "utf8");
    rewritten.push({ file, eventName, count: finalQuestions.length });
  }

  return rewritten;
}

function buildAiBank() {
  const files = fs.readdirSync(GENERATED_DIR).filter((file) => file.endsWith(".json")).sort();
  const banks = {};
  let totalQuestions = 0;

  for (const file of files) {
    const payload = JSON.parse(fs.readFileSync(path.join(GENERATED_DIR, file), "utf8"));
    const questions = Array.isArray(payload.questions) ? payload.questions : [];
    banks[payload.event] = questions;
    totalQuestions += questions.length;
  }

  const bank = {
    banks,
    meta: {
      events: Object.keys(banks).length,
      questions: totalQuestions,
      generatedAt: new Date().toISOString(),
      sourceFolder: "generated_by_checklist"
    }
  };

  fs.writeFileSync(AI_BANK_PATH, `window.AI_QUESTION_BANK = ${JSON.stringify(bank, null, 2)};\n`, "utf8");
  return bank;
}

function rebuildChecklist(aiBank) {
  const resourceData = loadResourceData();
  const objectiveEvents = getObjectiveEventsInOrder();
  const aiKeys = Object.keys(aiBank.banks || {});
  const hqKeys = Object.keys(resourceData.objectiveQuizzes || {});

  const lines = [
    "# Total Question Coverage Checklist",
    "",
    "- Target: `100 total` questions per event (HQ + AI bank)",
    ""
  ];

  for (const eventName of objectiveEvents) {
    const hqKey = findBestKey(hqKeys, eventName);
    const aiKey = findBestKey(aiKeys, eventName);
    const hqDeck = dedupeQuestions(((hqKey ? resourceData.objectiveQuizzes[hqKey] : []) || [])
      .map((question) => normalizeQuestion({ ...question, source: "official-hq" }, "official-hq"))
      .filter(Boolean));
    const aiDeck = dedupeQuestions(((aiKey ? aiBank.banks[aiKey] : []) || [])
      .map((question) => normalizeQuestion(question, "generated-bespoke"))
      .filter(Boolean));
    const total = dedupeQuestions([...hqDeck, ...aiDeck]).length;
    if (total < 100) {
      const need = 100 - total;
      lines.push(`- [ ] ${eventName}: ${total}/100 total (HQ ${hqDeck.length} + AI ${aiDeck.length}; Need ${need})`);
    }
  }

  if (lines[lines.length - 1] === "") {
    lines.push("- All objective events have at least 100 total questions.");
  }

  fs.writeFileSync(CHECKLIST_PATH, `${lines.join("\n")}\n`, "utf8");
}

function main() {
  const rewritten = rewriteGeneratedSources();
  const aiBank = buildAiBank();
  rebuildChecklist(aiBank);

  const cyber = rewritten.find((entry) => entry.file === "cybersecurity.json");
  console.log(`rewritten-files=${rewritten.length}`);
  console.log(`cybersecurity-ai=${cyber ? cyber.count : 0}`);
  console.log(`ai-events=${aiBank.meta.events}`);
  console.log(`ai-questions=${aiBank.meta.questions}`);
}

main();
