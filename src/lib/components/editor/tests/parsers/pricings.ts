import { IntegrationType, Type } from "../../types/features";
import { PricingManager, UsageLimitType, ValueType } from "../../types/index";

export const petClinic: PricingManager = {
  saasName: "This is a test",
  day: 1,
  month: 1,
  year: 2024,
  currency: "USD",
  hasAnnualPayment: false,
  features: {
    maxPets: {
      description: "Max pets limit",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Domain,
      expression: "planContext['maxPets']",
      serverExpression: "",
    },
  },
  usageLimits: {
    maxPets: {
      description: "Max pets limit",
      valueType: ValueType.Numeric,
      defaultValue: 0,
      unit: "pets",
      type: UsageLimitType.NonRenewable,
      linkedFeatures: ["maxPets"],
      expression: "",
      serverExpression: "",
    },
  },
  plans: {
    basic: {
      description: "Basic",
      monthlyPrice: 20,
      annualPrice: null,
      unit: "user/month",
      features: null,
      usageLimits: null,
    },
    pro: {
      description: "Basic",
      monthlyPrice: 40,
      annualPrice: null,
      unit: "user/month",
      features: {
        maxPets: {
          value: true,
        },
      },
      usageLimits: {
        maxPets: {
          value: 10,
        },
      },
    },
  },
  addOns: {
    extra: {
      description: null,
      availableFor: ["pro"],
      price: null,
      unit: "user/month",
      annualPrice: 20,
      monthlyPrice: 10,
      features: {
        maxPets: {
          value: true,
        },
      },
      usageLimits: {
        maxPets: {
          value: 1000,
        },
      },
      usageLimitsExtensions: {
        maxPets: {
          value: 1000,
        },
      },
    },
  },
};

export const overleaf: PricingManager = {
  saasName: "Overleaf",
  day: 28,
  month: 11,
  year: 2023,
  currency: "USD",
  hasAnnualPayment: true,
  features: {
    compileServers: {
      description:
        "Compiles for users on premium plans always run on a dedicated pool of the fastest available servers.",
      valueType: ValueType.Text,
      defaultValue: "FAST",
      type: Type.Domain,
      expression: "",
      serverExpression: "",
    },
    realTimeTrackChanges: {
      description:
        "Switch on track changes to see who made every change, accept or reject others’ changes, and write comments.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Domain,
      expression: "",
      serverExpression: "",
    },
    fullDocumentHistory: {
      description:
        "You can see all the edits in your project and who made every change. Add labels to quickly access specific versions.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Information,
      expression: "",
      serverExpression: "",
    },
    advancedReferenceSearch: {
      description:
        "It’s easy to find your references - you can search by author, title, year or journal. You can still search by citation key too.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Domain,
      expression: "",
      serverExpression: "",
    },
    gitIntegration: {
      description:
        "You can clone your Overleaf project to a local repository, treating your Overleaf project as a remote repository that changes can be pushed to and pulled from.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Integration,
      integrationType: IntegrationType.API,
      expression: "",
      serverExpression: "",
    },
    latexEditorAndRealTimeCollaboration: {
      description:
        "Spell check, intelligent autocomplete, syntax highlighting, dozens of color themes, vim and emacs bindings, help with LaTeX warnings and error messages, and more. Everyone always has the latest version, and you can see your collaborators’ cursors and changes in real time.",
      valueType: ValueType.Boolean,
      defaultValue: true,
      type: Type.Domain,
      expression: "",
      serverExpression: "",
    },
    unlimitedProjects: {
      description:
        "Your projects are private by default. This means that only you can view them, and only you can allow other people to access them.",
      valueType: ValueType.Boolean,
      defaultValue: true,
      type: Type.Domain,
      expression: "",
      serverExpression: "",
    },
    thousandOfTemplates: {
      description:
        "Produce beautiful documents starting from our gallery of LaTeX templates for journals, conferences, theses, reports, CVs and much more.",
      valueType: ValueType.Boolean,
      defaultValue: true,
      type: Type.Domain,
      expression: "",
      serverExpression: "",
    },
    symbolPalette: {
      description:
        "A quick and convenient way to insert math symbols into your document.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Domain,
      expression: "",
      serverExpression: "",
    },
    githubIntegration: {
      description:
        "Link your Overleaf projects directly to a GitHub repository that acts as a remote repository for your overleaf project. This allows you to share with collaborators outside of Overleaf, and integrate Overleaf into more complex workflows.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Integration,
      integrationType: IntegrationType.WebSaaS,
      pricingUrls: ["https://github.com/pricing"],
      expression: "",
      serverExpression: "",
    },
    dropboxIntegration: {
      description:
        "Work online and offline seamlessly with two-way Dropbox sync. Changes you make locally will be sent automatically to the version on Overleaf and vice versa.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Integration,
      integrationType: IntegrationType.WebSaaS,
      pricingUrls: [
        "https://www.dropbox.com/official-teams-page?_tk=paid_sem_goog_biz_b&_camp=1033325669&_kw=dropbox%20pricing|e&_ad=676038711282||c&gad_source=1&gclid=EAIaIQobChMI7MaBv4LsggMV3ZNoCR1L8QqkEAAYASAAEgI3x_D_BwE",
      ],
      expression: "",
      serverExpression: "",
    },
    mendeleyIntegration: {
      description:
        "Manage your reference library in Mendeley, and link it directly to .bib files in Overleaf, so you can easily cite anything from your libraries.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Integration,
      integrationType: IntegrationType.WebSaaS,
      pricingUrls: ["https://www.mendeley.com/reference-management/premium"],
      expression: "",
      serverExpression: "",
    },
    zoteroIntegration: {
      description:
        "Manage your reference library in Zotero, and link it directly to .bib files in Overleaf, so you can easily cite anything from your libraries.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Integration,
      integrationType: IntegrationType.WebSaaS,
      pricingUrls: ["https://www.zotero.org/storage"],
      expression: "",
      serverExpression: "",
    },
    prioritySupport: {
      description:
        "Our helpful Support team will prioritise and escalate your support requests where necessary.",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Support,
      expression: "",
      serverExpression: "",
    },
  },
  usageLimits: {
    maxCollaboratorsPerProject: {
      description:
        "The number of people you can invite to work on each project. They just need to have an Overleaf account. They can be different people in each project.",
      valueType: ValueType.Numeric,
      defaultValue: 2,
      unit: "collaborator",
      type: UsageLimitType.NonRenewable,
      linkedFeatures: null,
      expression: "",
      serverExpression: "",
    },
    compileTimeoutLimit: {
      description:
        "This is how much time you get to compile your project on the Overleaf servers. You may need additional time for longer or more complex projects.",
      valueType: ValueType.Numeric,
      defaultValue: 1,
      unit: "minute",
      type: UsageLimitType.TimeDriven,
      linkedFeatures: null,
      expression: "",
      serverExpression: "",
    },
  },
  plans: {
    FREE: {
      description: "",
      monthlyPrice: 0,
      annualPrice: 0,
      unit: "user/month",
      features: null,
      usageLimits: null,
    },
    STANDARD: {
      description: "",
      monthlyPrice: 21,
      annualPrice: 16.59,
      unit: "user/month",
      features: {
        compileServers: {
          value: "FASTEST",
        },
        realTimeTrackChanges: {
          value: true,
        },
        fullDocumentHistory: {
          value: true,
        },
        advancedReferenceSearch: {
          value: true,
        },
        gitIntegration: {
          value: true,
        },
        symbolPalette: {
          value: true,
        },
        githubIntegration: {
          value: true,
        },
        dropboxIntegration: {
          value: true,
        },
        mendeleyIntegration: {
          value: true,
        },
        zoteroIntegration: {
          value: true,
        },
        prioritySupport: {
          value: true,
        },
      },
      usageLimits: {
        maxCollaboratorsPerProject: {
          value: 11,
        },
        compileTimeoutLimit: {
          value: 4,
        },
      },
    },
    PROFESSIONAL: {
      description: "",
      monthlyPrice: 42,
      annualPrice: 33.25,
      unit: "user/month",
      features: {
        compileServers: {
          value: "FASTEST",
        },
        realTimeTrackChanges: {
          value: true,
        },
        fullDocumentHistory: {
          value: true,
        },
        advancedReferenceSearch: {
          value: true,
        },
        gitIntegration: {
          value: true,
        },
        symbolPalette: {
          value: true,
        },
        githubIntegration: {
          value: true,
        },
        dropboxIntegration: {
          value: true,
        },
        mendeleyIntegration: {
          value: true,
        },
        zoteroIntegration: {
          value: true,
        },
        prioritySupport: {
          value: true,
        },
      },
      usageLimits: {
        maxCollaboratorsPerProject: {
          value: 99999,
        },
        compileTimeoutLimit: {
          value: 4,
        },
      },
    },
  },
  addOns: null,
};
