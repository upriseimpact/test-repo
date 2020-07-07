namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Campaigns",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DistributorId = c.Int(nullable: false),
                        CampaignTitle = c.String(nullable: false),
                        SocialMediaId = c.Int(nullable: false),
                        IndustryId = c.Int(nullable: false),
                        City = c.String(maxLength: 100),
                        Gender = c.Int(nullable: false),
                        Message = c.String(maxLength: 1000),
                        PostId = c.Int(nullable: false),
                        CampaignType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Distributors", t => t.DistributorId, cascadeDelete: true)
                .ForeignKey("dbo.Industries", t => t.IndustryId, cascadeDelete: true)
                .ForeignKey("dbo.Posts", t => t.PostId, cascadeDelete: false)
                .ForeignKey("dbo.SocialMedias", t => t.SocialMediaId, cascadeDelete: true)
                .Index(t => t.DistributorId)
                .Index(t => t.SocialMediaId)
                .Index(t => t.IndustryId)
                .Index(t => t.PostId);
            
            CreateTable(
                "dbo.CampaignTags",
                c => new
                    {
                        CampaignId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.CampaignId, t.TagId })
                .ForeignKey("dbo.Campaigns", t => t.CampaignId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.CampaignId)
                .Index(t => t.TagId);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TagName = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PostTags",
                c => new
                    {
                        PostId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PostId, t.TagId })
                .ForeignKey("dbo.Posts", t => t.PostId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.PostId)
                .Index(t => t.TagId);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DistributorId = c.Int(nullable: false),
                        PostTitle = c.String(nullable: false, maxLength: 100),
                        PostMessage = c.String(nullable: false, maxLength: 1000),
                        MediaType = c.Int(nullable: false),
                        OriginalMediaLink = c.String(),
                        ThumbnailLink = c.String(),
                        SocialMedia_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Distributors", t => t.DistributorId, cascadeDelete: true)
                .ForeignKey("dbo.SocialMedias", t => t.SocialMedia_Id)
                .Index(t => t.DistributorId)
                .Index(t => t.SocialMedia_Id);
            
            CreateTable(
                "dbo.Distributors",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        StatusId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.DistributorStatus", t => t.StatusId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.Id)
                .Index(t => t.Id)
                .Index(t => t.StatusId);
            
            CreateTable(
                "dbo.Contacts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DistributorId = c.Int(nullable: false),
                        Platform = c.Int(nullable: false),
                        Email = c.String(nullable: false, maxLength: 100),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(),
                        Age = c.Int(nullable: false),
                        Country = c.String(),
                        Province = c.String(),
                        City = c.String(),
                        Gender = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Distributors", t => t.DistributorId, cascadeDelete: true)
                .Index(t => t.DistributorId);
            
            CreateTable(
                "dbo.DistributorStatus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatusName = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Industries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SocialMedias",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SocialMediaName = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EmailMessages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IndustryId = c.Int(nullable: false),
                        DefaultMessage = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Industries", t => t.IndustryId, cascadeDelete: true)
                .Index(t => t.IndustryId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.Sharers",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        FirstName = c.String(maxLength: 100),
                        LastName = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Id)
                .Index(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sharers", "Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.EmailMessages", "IndustryId", "dbo.Industries");
            DropForeignKey("dbo.Campaigns", "SocialMediaId", "dbo.SocialMedias");
            DropForeignKey("dbo.Posts", "SocialMedia_Id", "dbo.SocialMedias");
            DropForeignKey("dbo.Campaigns", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Campaigns", "IndustryId", "dbo.Industries");
            DropForeignKey("dbo.Campaigns", "DistributorId", "dbo.Distributors");
            DropForeignKey("dbo.CampaignTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.PostTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.PostTags", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Posts", "DistributorId", "dbo.Distributors");
            DropForeignKey("dbo.Distributors", "Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Distributors", "StatusId", "dbo.DistributorStatus");
            DropForeignKey("dbo.Contacts", "DistributorId", "dbo.Distributors");
            DropForeignKey("dbo.CampaignTags", "CampaignId", "dbo.Campaigns");
            DropIndex("dbo.Sharers", new[] { "Id" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.EmailMessages", new[] { "IndustryId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Contacts", new[] { "DistributorId" });
            DropIndex("dbo.Distributors", new[] { "StatusId" });
            DropIndex("dbo.Distributors", new[] { "Id" });
            DropIndex("dbo.Posts", new[] { "SocialMedia_Id" });
            DropIndex("dbo.Posts", new[] { "DistributorId" });
            DropIndex("dbo.PostTags", new[] { "TagId" });
            DropIndex("dbo.PostTags", new[] { "PostId" });
            DropIndex("dbo.CampaignTags", new[] { "TagId" });
            DropIndex("dbo.CampaignTags", new[] { "CampaignId" });
            DropIndex("dbo.Campaigns", new[] { "PostId" });
            DropIndex("dbo.Campaigns", new[] { "IndustryId" });
            DropIndex("dbo.Campaigns", new[] { "SocialMediaId" });
            DropIndex("dbo.Campaigns", new[] { "DistributorId" });
            DropTable("dbo.Sharers");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.EmailMessages");
            DropTable("dbo.SocialMedias");
            DropTable("dbo.Industries");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.DistributorStatus");
            DropTable("dbo.Contacts");
            DropTable("dbo.Distributors");
            DropTable("dbo.Posts");
            DropTable("dbo.PostTags");
            DropTable("dbo.Tags");
            DropTable("dbo.CampaignTags");
            DropTable("dbo.Campaigns");
        }
    }
}
