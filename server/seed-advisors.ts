
import { storage } from "./storage";

async function seedAdvisors() {
  try {
    // Get the client admin's organization (firm) - using email instead of username
    const clientAdmin = await storage.getUserByEmail("clientadmin@example.com");
    if (!clientAdmin) {
      console.error("Client admin user not found");
      return;
    }

    const organizationId = clientAdmin.organizationId;
    console.log(`Adding advisors to organization ID: ${organizationId}`);

    // Create dummy advisors - using new schema
    const advisors = [
      {
        email: "advisor1@example.com",
        firstName: "Michael",
        lastName: "Johnson",
        passwordHash: "password",
        roleId: 3, // advisor role
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor2@example.com",
        firstName: "Jessica",
        lastName: "Williams",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor3@example.com",
        firstName: "David",
        lastName: "Brown",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor4@example.com",
        firstName: "Emma",
        lastName: "Davis",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor5@example.com",
        firstName: "Christopher",
        lastName: "Wilson",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor6@example.com",
        firstName: "Olivia",
        lastName: "Martinez",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor7@example.com",
        firstName: "James",
        lastName: "Anderson",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor8@example.com",
        firstName: "Sophia",
        lastName: "Taylor",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor9@example.com",
        firstName: "Daniel",
        lastName: "Moore",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      },
      {
        email: "advisor10@example.com",
        firstName: "Ava",
        lastName: "Jackson",
        passwordHash: "password",
        roleId: 3,
        status: "active" as const,
        organizationId
      }
    ];

    // Add each advisor to the database
    for (const advisorData of advisors) {
      const existingUser = await storage.getUserByEmail(advisorData.email);
      if (existingUser) {
        console.log(`User ${advisorData.email} already exists, skipping`);
        continue;
      }
      
      const newUser = await storage.createUser(advisorData);
      console.log(`Created advisor: ${newUser.firstName} ${newUser.lastName} (${newUser.email})`);
    }

    console.log("Finished seeding advisors");
  } catch (error) {
    console.error("Error seeding advisors:", error);
  }
}

// Execute the seeding function
seedAdvisors();
