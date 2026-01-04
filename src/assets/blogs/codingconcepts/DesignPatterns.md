

# Most Commonly Used Design Patterns in Java Backend Development (Spring Boot)✅

| Design Pattern                                                     | Description                                                                                                                                         |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span style="color:#FF6347">Singleton Pattern</span>               | Ensures a class has only one instance and provides a global point of access to it.                                                                  |
| <span style="color:#FF6347">Factory Method Pattern</span>          | Defines an interface for creating objects, but lets subclasses alter the type of objects that will be created.                                      |
| <span style="color:#FF6347">Builder Pattern</span>                 | Separates the construction of a complex object from its representation, allowing the same construction process to create different representations. |
| <span style="color:#FF6347">Prototype Pattern</span>               | Creates new objects by copying an existing object, known as the prototype.                                                                          |
| <span style="color:#FF6347">Adapter Pattern</span>                 | Allows incompatible interfaces to work together by converting the interface of one class into another.                                              |
| <span style="color:#FF6347">Proxy Pattern</span>                   | Provides a surrogate or placeholder for another object to control access to it.                                                                     |
| <span style="color:#FF6347">Decorator Pattern</span>               | Adds responsibilities to objects dynamically.                                                                                                       |
| <span style="color:#FF6347">Observer Pattern (Event-driven)</span> | Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.                            |
| <span style="color:#FF6347">Strategy Pattern</span>                | Defines a family of algorithms, encapsulates each one, and makes them interchangeable.                                                              |
| <span style="color:#FF6347">Template Method Pattern</span>         | Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps.                                                 |
| <span style="color:#FF6347">Repository Pattern</span>              | Mediates between the domain and data mapping layers, acting like an in-memory collection of domain objects (widely used in Spring Data JPA).        |
| <span style="color:#FF6347">Service Layer Pattern</span>           | Encapsulates the application's business logic, providing a clear separation between the presentation layer and the data access layer.               |

Dependency Injection (IoC) (core of Spring, based on Inversion of Control principle)
To truly **understand design patterns**, you need the **full lifecycle**:
➡️ **Where we declare it**
➡️ **How it becomes a pattern (the structure & rules)**
➡️ **How it’s used in Spring Boot backend** (real placement in Controller/Service/Repository layers, AOP, events, etc.)

Let me **rebuild the explanation more holistically**, pattern by pattern 👇

---

## 🔑 1. **Singleton Pattern**

**Where declared**:

* In Spring, any class annotated with `@Component`, `@Service`, `@Repository`, `@Configuration` is by default a singleton.

**How it becomes a pattern**:

* Singleton = only **one instance** in JVM. Spring achieves this with its IoC container (ApplicationContext).

**How it’s used**:

* Example: Application-wide cache, DB connection manager, configuration loader.

**Code Example:**

```java
@Service
public class CacheService {
    private final Map<String, String> cache = new HashMap<>();
    public void put(String key, String value) { cache.put(key, value); }
    public String get(String key) { return cache.get(key); }
}
```

📌 Usage:

```java
@RestController
public class TestController {
    private final CacheService cacheService;
    public TestController(CacheService cacheService) { this.cacheService = cacheService; }

    @GetMapping("/cache")
    public String getData() {
        cacheService.put("user", "Vishnu");
        return cacheService.get("user"); // Always same CacheService instance
    }
}
```

Here `CacheService` is a **Singleton bean**, auto-managed by Spring.

---

## 🔑 2. **Factory Method Pattern**

**Where declared**:

* Usually inside a `@Configuration` class with `@Bean` methods.

**How it becomes a pattern**:

* Factory = centralizes **object creation logic**. Instead of `new Car()`, you ask the factory for a Vehicle.

**How it’s used**:

* To decide object creation at runtime (e.g., return different Payment services based on config).

**Code Example:**

```java
public interface Vehicle { String type(); }

public class Car implements Vehicle { public String type() { return "Car"; } }
public class Bike implements Vehicle { public String type() { return "Bike"; } }

@Configuration
public class VehicleFactory {
    @Bean
    @Scope("prototype")
    public Vehicle getVehicle() {
        // business logic decides which to return
        return new Car();  
    }
}
```

📌 Usage:

```java
@RestController
public class VehicleController {
    private final Vehicle vehicle;
    public VehicleController(Vehicle vehicle) { this.vehicle = vehicle; }

    @GetMapping("/vehicle")
    public String getVehicleType() {
        return vehicle.type();
    }
}
```

Spring injects whatever the factory produced.

---

## 🔑 3. **Builder Pattern**

**Where declared**:

* In model/entity classes that have many optional attributes.

**How it becomes a pattern**:

* Avoids “telescoping constructors” with many args by providing a **fluent builder API**.

**How it’s used**:

* Common in DTOs, Request objects, Lombok (`@Builder`).

**Code Example:**

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String name;
    private int age;
    private String email;
}
```

📌 Usage:

```java
UserDTO user = UserDTO.builder()
                      .name("Vishnu")
                      .age(26)
                      .email("vishnu@mail.com")
                      .build();
```

Here Lombok generates the Builder pattern for you.

---

## 🔑 4. **Prototype Pattern**

**Where declared**:

* In Spring, a bean with `@Scope("prototype")`.

**How it becomes a pattern**:

* Every request for the bean gives a **new instance**, not shared.

**How it’s used**:

* Useful for request-based objects (e.g., per-request handler, thread-local objects).

**Code Example:**

```java
@Component
@Scope("prototype")
public class PrototypeBean {
    public PrototypeBean() {
        System.out.println("New Instance Created");
    }
}
```

📌 Usage:

```java
@RestController
public class TestController {
    private final ApplicationContext context;

    public TestController(ApplicationContext context) { this.context = context; }

    @GetMapping("/prototype")
    public String test() {
        PrototypeBean bean1 = context.getBean(PrototypeBean.class);
        PrototypeBean bean2 = context.getBean(PrototypeBean.class);
        return bean1 == bean2 ? "Same" : "Different";  // prints "Different"
    }
}
```
let’s reinforce **Prototype Pattern** with a **different flavor** than the bean scope one.

---

## 🔑 Prototype Pattern (Another Example)

**Where declared**:

* In **domain objects** or DTOs that are expensive to create repeatedly (e.g., documents, reports, configurations).

**How it becomes a pattern**:

* Instead of creating a fresh object from scratch, we **clone an existing instance** and tweak it.

**How it’s used**:

* Imagine a backend that generates **user reports**. Each report has a default template with logos, headers, and footers. Instead of recreating this template every time, you clone the prototype and just update the dynamic content.

---

### Example: Report Prototype

```java
public class Report implements Cloneable {
    private String header;
    private String footer;
    private String content;

    public Report(String header, String footer) {
        this.header = header;
        this.footer = footer;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public Report clone() {
        try {
            return (Report) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("Clone not supported", e);
        }
    }

    @Override
    public String toString() {
        return header + "\n" + content + "\n" + footer;
    }
}
```

---

### Usage in Service Layer

```java
@Service
public class ReportService {
    private final Report prototype;

    public ReportService() {
        // A default report template (prototype)
        this.prototype = new Report("=== Company Report ===", "=== End of Report ===");
    }

    public Report generateUserReport(String username) {
        Report userReport = prototype.clone(); // clone the template
        userReport.setContent("Report for user: " + username);
        return userReport;
    }
}
```

---

### Controller Usage

```java
@RestController
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/report/{user}")
    public String getReport(@PathVariable String user) {
        return reportService.generateUserReport(user).toString();
    }
}
```

---

### Output (if you hit `/report/Vishnu`)

```
=== Company Report ===
Report for user: Vishnu
=== End of Report ===
```

---

⚡ Here the **Prototype Pattern** ensures that instead of re-building headers, footers, or boilerplate for every report, we **clone a pre-built template** and only adjust the variable content. Much faster, leaner, and clean.

---

## 🔑 5. **Adapter Pattern**

**Where declared**:

* Between **legacy system/third-party library** and your Service layer.

**How it becomes a pattern**:

* Wraps incompatible interface with your expected interface.

**How it’s used**:

* Example: integrating a **legacy payment service** with your modern interface.

**Code Example:**

```java
// Third-party legacy API
class LegacyPayment {
    public void payAmount(int amount) {
        System.out.println("Legacy Payment: " + amount);
    }
}

// Adapter
@Component
public class PaymentAdapter implements PaymentProcessor {
    private final LegacyPayment legacyPayment = new LegacyPayment();

    @Override
    public void process(double amount) {
        legacyPayment.payAmount((int) amount);
    }
}
```

📌 Usage:

```java
@RestController
public class PaymentController {
    private final PaymentProcessor processor;
    public PaymentController(PaymentProcessor processor) { this.processor = processor; }

    @GetMapping("/pay")
    public String pay() {
        processor.process(100.50);
        return "Payment Done";
    }
}
```

---

## 🔑 6. **Proxy Pattern**

**Where declared**:

* In AOP (`@Aspect`) or manual proxy classes.

**How it becomes a pattern**:

* Proxy = intercepts method calls before reaching the actual object.

**How it’s used**:

* Logging, Security, Transaction management. (Spring does this behind the scenes).

**Code Example:**

```java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Before method: " + joinPoint.getSignature());
    }
}
```

📌 Usage:
Whenever you call a `UserService` method, the proxy intercepts and logs first.

---

## 🔑 7. **Observer Pattern**

**Where declared**:

* Spring Events (`ApplicationEventPublisher` + `@EventListener`).

**How it becomes a pattern**:

* Observer = **Publisher/Subscriber** model.

**How it’s used**:

* For sending notifications when an action happens (e.g., user signup triggers email, SMS).

**Code Example:**

```java
// Event
public class UserCreatedEvent extends ApplicationEvent {
    private final String username;
    public UserCreatedEvent(Object source, String username) {
        super(source);
        this.username = username;
    }
    public String getUsername() { return username; }
}

// Publisher
@Service
public class UserService {
    private final ApplicationEventPublisher publisher;
    public UserService(ApplicationEventPublisher publisher) { this.publisher = publisher; }

    public void createUser(String username) {
        System.out.println("User created: " + username);
        publisher.publishEvent(new UserCreatedEvent(this, username));
    }
}

// Listener
@Component
public class EmailListener {
    @EventListener
    public void onUserCreated(UserCreatedEvent event) {
        System.out.println("Sending welcome email to: " + event.getUsername());
    }
}
```

📌 Usage:

```java
@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    @PostMapping("/users/{name}")
    public String create(@PathVariable String name) {
        userService.createUser(name);
        return "User created!";
    }
}
```

---

I can continue this **same deep-dive explanation for Strategy, Template, Repository, Service Layer, and Dependency Injection** in the next round (otherwise this will get huge).

👉 Do you want me to **finish the remaining patterns** in the same structured format (Where → How → Usage in Spring Boot with Example), or do you prefer I **map all patterns visually into a 3-tier Spring Boot architecture diagram** first?
