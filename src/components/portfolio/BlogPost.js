import React, { useEffect, useState, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import AuthenticationVSAuthorisation from "../../assets/blogs/codingconcepts/AuthenticationVSAuthorisation.md";
import DesignPatterns from "../../assets/blogs/codingconcepts/DesignPatterns.md";
import SSLPinning from "../../assets/blogs/android/Implementing SSL Pinning with OkHttp and Retrofit.md";
import KotlinDSLVSGroovy from "../../assets/blogs/android/KotlinDSLVSGroovy.md";
import SerializableVSParcelable from "../../assets/blogs/android/SerializableVSParcelable.md";
import FeaturesCompose from "../../assets/blogs/android/FeaturesCompose.md";
import DOMPurify from "dompurify";

// Folder structure
const folderStructure = [
  {
    name: "About Me",
    // type: "folder", uncomment if you do not want this as a Filter option
    children: [
      {
        name: "About Me",
        type: "file",
        content:
          "https://raw.githubusercontent.com/Vishnusimha/Vishnusimha/main/README.md",
      },
    ],
  },
  {
    name: "Dev Concepts",
    type: "folder",
    children: [
      {
        name: "Authentication VS Authorisation",
        type: "file",
        content: AuthenticationVSAuthorisation,
      },
      {
        name: "DesignPatterns",
        type: "file",
        content: DesignPatterns,
      },
      {
        name: "SQL",
        type: "folder",
        children: [
          {
            name: "SQL Guide",
            type: "file",
            content:
              "https://raw.githubusercontent.com/Vishnusimha/Blogs/main/SQL/SQL-NOTES.md",
          },
          {
            name: "SQL Interview Questions",
            type: "file",
            content:
              "https://raw.githubusercontent.com/Vishnusimha/Blogs/main/SQL/SQLInterviewQuestions.md",
          },
        ],
      },
      {
        name: "Linux",
        type: "folder",
        children: [
          {
            name: "Linux Guide",
            type: "file",
            content:
              "https://raw.githubusercontent.com/Vishnusimha/Blogs/main/Linux/LinuxGuide.md",
          },
        ],
      },
    ],
  },
  {
    name: "Android",
    type: "folder",
    children: [
      { name: "Features Compose", type: "file", content: FeaturesCompose },
      { name: "SSL Pinning", type: "file", content: SSLPinning },
      {
        name: "Kotlin DSL VS Groovy",
        type: "file",
        content: KotlinDSLVSGroovy,
      },
      {
        name: "Serializable VS Parcelable",
        type: "file",
        content: SerializableVSParcelable,
      },
    ],
  },
  {
    name: "Spring Boot",
    type: "folder",
    children: [
      {
        name: "Spring Boot",
        type: "file",
        content:
          "https://raw.githubusercontent.com/Vishnusimha/Blogs/main/Spring/springboot.md",
      },
      {
        name: "Spring Data",
        type: "file",
        content:
          "https://raw.githubusercontent.com/Vishnusimha/Blogs/main/Spring/springdata.md",
      },
      {
        name: "Spring Security",
        type: "file",
        content:
          "https://raw.githubusercontent.com/Vishnusimha/Blogs/main/Spring/springSecurity.md",
      },
    ],
  },
  {
    name: "Cloud and DevOps",
    type: "folder",
    children: [
      {
        name: "Docker",
        type: "file",
        content:
          "https://raw.githubusercontent.com/Vishnusimha/Blogs/main/Spring/Docker.md",
      },
      {
        name: "Kubernetes",
        type: "file",
        content:
          "https://raw.githubusercontent.com/Vishnusimha/Blogs/main/Spring/Kubernetes.md",
      },
    ],
  },
  {
    name: "Notes",
    type: "folder",
    children: [],
  },
];
const stripMarkdown = (md) => {
  return md
    .replace(/!\[(.*?)\]\(.*?\)/g, "$1") // Keep alt text for images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Keep link text
    .replace(/[`*_>#\-~]/g, "")
    .replace(/\n{2,}/g, "\n")
    .replace(/#{1,6}\s/g, "")
    .trim();
};

const BlogPost = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // State to hold active category filter
  const postContentRef = useRef(null);

  useEffect(() => {
    if (typeof marked !== "undefined" && typeof hljs !== "undefined") {
      marked.setOptions({
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
        langPrefix: "hljs language-",
      });
    } else {
      console.error(
        "Marked or highlight.js not loaded. Ensure they are imported or available globally."
      );
    }
  }, []);

  useEffect(() => {
    // Helper function to flatten files within a specific folder and assign a category
    const flattenFolderFiles = (folder, category) => {
      let files = [];
      if (folder.children) {
        folder.children.forEach((item) => {
          if (item.type === "file") {
            files.push({ ...item, category: category });
          } else if (item.type === "folder") {
            // Recursively flatten files in subfolders, keeping the same category
            files = files.concat(flattenFolderFiles(item, category));
          }
        });
      }
      return files;
    };

    const processImageUrls = (html, baseUrl) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const images = doc.querySelectorAll("img");

      images.forEach((img) => {
        const src = img.getAttribute("src");
        if (src && !src.startsWith("http") && !src.startsWith("data:")) {
          const absoluteUrl = new URL(src, baseUrl).href;
          img.setAttribute("src", absoluteUrl);
        }
      });

      return doc.body.innerHTML;
    };

    const flattenFiles = (structure) => {
      let files = [];
      structure.forEach((item) => {
        if (item.type === "folder") {
          if (item.name === "Blogs" && item.children) {
            item.children.forEach((childItem) => {
              if (childItem.type === "folder") {
                files = files.concat(
                  flattenFolderFiles(childItem, childItem.name)
                );
              }
            });
          } else {
            files = files.concat(flattenFolderFiles(item, item.name));
          }
        }
      });
      return files;
    };

    const loadAllPosts = async () => {
      setLoading(true);
      const flatFiles = flattenFiles(folderStructure);
      const promises = flatFiles.map(async (file) => {
        try {
          // If the file content is a string starting with 'http', assume it's a URL
          const isUrl =
            typeof file.content === "string" && file.content.startsWith("http");
          const res = await fetch(file.content);
          if (!res.ok) {
            console.error(`Failed to fetch ${file.name}: ${res.statusText}`);
            return null; // Or handle error appropriately
          }
          const text = await res.text();
          // Ensure marked.parse is available before calling
          let htmlContent = marked.parse(text);

          // Process images for external URLs
          if (isUrl) {
            const baseUrl = file.content.substring(
              0,
              file.content.lastIndexOf("/") + 1
            );
            htmlContent = processImageUrls(htmlContent, baseUrl);
          }

          const sanitizedHtml = DOMPurify.sanitize(htmlContent);

          return {
            id: file.name,
            title: file.name,
            html: sanitizedHtml,
            preview: stripMarkdown(text).slice(0, 150) + "...",
            wordCount: text.split(/\s+/).length,
            category: file.category,
          };
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);
      setAllPosts(results.filter((post) => post !== null));
      setLoading(false);
    };

    loadAllPosts();
  }, []); // Empty dependency array means this runs only once on mount

  useEffect(() => {
    if (!selectedPost || !selectedPost.html) return;

    // Highlight code blocks
    const highlightTimeout = setTimeout(() => {
      if (postContentRef.current && typeof hljs !== "undefined") {
        const codeBlocks = postContentRef.current.querySelectorAll("pre code");
        codeBlocks.forEach((block) => {
          // Check if the block hasn't been highlighted yet
          if (!block.classList.contains("hljs")) {
            try {
              hljs.highlightElement(block);
            } catch (error) {
              console.error("Error highlighting code block:", error);
            }
          }
        });
      } else if (!postContentRef.current) {
        console.log("postContentRef.current is null, cannot highlight.");
      } else if (typeof hljs === "undefined") {
        console.error("highlight.js not loaded, cannot highlight.");
      }
    }, 0); // Use setTimeout to ensure DOM is updated

    // Add copy buttons to code blocks
    const addCopyButtons = () => {
      if (postContentRef.current) {
        // Remove existing buttons first to prevent duplicates on re-render
        const existingButtons =
          postContentRef.current.querySelectorAll(".copy-button");
        existingButtons.forEach((button) => button.remove());

        const preElements = postContentRef.current.querySelectorAll("pre");
        preElements.forEach((pre) => {
          const button = document.createElement("button");
          button.textContent = "Copy";
          button.classList.add("copy-button");

          // Insert button before the <pre> element
          pre.parentNode.insertBefore(button, pre);

          // Add click event listener
          button.addEventListener("click", () => {
            const code = pre.querySelector("code").textContent;
            navigator.clipboard
              .writeText(code)
              .then(() => {
                button.textContent = "Copied!";
                setTimeout(() => {
                  button.textContent = "Copy";
                }, 2000); // Reset button text after 2 seconds
              })
              .catch((err) => {
                console.error("Failed to copy: ", err);
                button.textContent = "Error";
                setTimeout(() => {
                  button.textContent = "Copy";
                }, 2000);
              });
          });
        });
      }
    };

    const copyButtonTimeout = setTimeout(() => {
      addCopyButtons();
    }, 0); // Use setTimeout to ensure DOM is updated

    const checkboxes = document.querySelectorAll(
      ".blog-post input[type='checkbox']"
    );
    const handleCheckboxChange = (e) => e.target.classList.toggle("checked");
    checkboxes.forEach((c) => {
      c.disabled = false; // Ensure checkboxes are interactive
      c.addEventListener("change", handleCheckboxChange);
    });

    return () => {
      clearTimeout(highlightTimeout);
      clearTimeout(copyButtonTimeout);
      // Remove copy buttons on cleanup to prevent duplicates
      if (postContentRef.current) {
        const buttons = postContentRef.current.querySelectorAll(".copy-button");
        buttons.forEach((button) => {
          button.remove(); // Remove the button
        });
      }
      // Remove checkbox event listeners on cleanup
      checkboxes.forEach((c) =>
        c.removeEventListener("change", handleCheckboxChange)
      );
    };
  }, [selectedPost]); // Rerun this effect when selectedPost changes

  useEffect(() => {
    const blogSidebarElement = document.querySelector(".blog-sidebar");
    const sidebarOverlayElement = document.querySelector(".sidebar-overlay");

    if (blogSidebarElement) {
      if (sidebarOpen) {
        blogSidebarElement.classList.add("open");
      } else {
        blogSidebarElement.classList.remove("open");
      }
    }

    if (sidebarOverlayElement) {
      sidebarOverlayElement.style.display = sidebarOpen ? "block" : "none";
    }

    return () => {
      if (blogSidebarElement) {
        blogSidebarElement.classList.remove("open");
      }
      if (sidebarOverlayElement) {
        sidebarOverlayElement.style.display = "none";
      }
    };
  }, [sidebarOpen]); // This effect runs whenever sidebarOpen state changes

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleContentClick = (e) => {
    if (
      window.innerWidth <= 769 && // Using 769px as per your CSS media query
      sidebarOpen &&
      e.target === e.currentTarget
    ) {
      setSidebarOpen(false);
    }
  };

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleFileClick = async (file) => {
    try {
      const response = await fetch(file.content);
      if (!response.ok) {
        console.error(`Failed to fetch ${file.name}: ${response.statusText}`);
        return;
      }
      const text = await response.text();
      const htmlContent =
        typeof marked !== "undefined"
          ? marked.parse(text)
          : `<p>Error: Markdown parser not available.</p>`;

      const sanitizedHtml = DOMPurify.sanitize(htmlContent);

      setSelectedPost({
        id: file.name,
        title: file.name,
        html: sanitizedHtml,
        wordCount: text.split(/\s+/).length,
        category: file.category,
      });
      if (window.innerWidth <= 769) {
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error(`Error loading file ${file.name}:`, error);
    }
  };

  const filterStructure = (structure, query, categoryFilter) => {
    let baseStructure = structure;
    if (categoryFilter) {
      const categoryMatch = structure.find(
        (item) =>
          (item.type === "folder" && item.name === categoryFilter) ||
          (item.type === "folder" &&
            item.children &&
            item.children.some(
              (child) =>
                child.type === "folder" && child.name === categoryFilter
            ))
      );

      if (categoryMatch) {
        if (categoryMatch.name === categoryFilter) {
          baseStructure = [categoryMatch];
        } else {
          const categoryFolder = categoryMatch.children.find(
            (child) => child.type === "folder" && child.name === categoryFilter
          );
          baseStructure = categoryFolder ? [categoryFolder] : [];
        }
      } else {
        baseStructure = [];
      }
    }

    return baseStructure
      .map((item) => {
        if (item.type === "file") {
          return item.name.toLowerCase().includes(query) ? item : null;
        }

        const filteredChildren = item.children
          ? filterStructure(item.children, query, null)
          : [];

        if (
          item.name.toLowerCase().includes(query) ||
          filteredChildren.length > 0
        ) {
          return { ...item, children: filteredChildren };
        } else {
          return null;
        }
      })
      .filter(Boolean);
  };

  const structureToRender =
    searchQuery || activeCategory
      ? filterStructure(
          folderStructure,
          searchQuery.toLowerCase(),
          activeCategory
        )
      : folderStructure;

  const renderFolder = (folder, path = "") => {
    const currentPath = path ? `${path}/${folder.name}` : folder.name;
    const isExpanded = expandedFolders[currentPath];

    const forceExpand =
      activeCategory &&
      folder.name !== activeCategory &&
      folder.children &&
      folder.children.some(
        (child) => child.type === "folder" && child.name === activeCategory
      );

    return (
      <div key={currentPath} className="folder-container">
        <div className="folder-item" onClick={() => toggleFolder(currentPath)}>
          <span
            className={`folder-icon ${
              isExpanded || forceExpand ? "expanded" : ""
            }`}
          >
            {isExpanded || forceExpand ? "📂" : "📁"}
          </span>
          <span className="folder-name">{folder.name}</span>
        </div>
        {(isExpanded || forceExpand) && (
          <div className="folder-contents">
            {folder.children.map((item) =>
              item.type === "folder" ? (
                renderFolder(item, currentPath)
              ) : (
                <div
                  key={`${currentPath}/${item.name}`}
                  className={`file-item ${
                    selectedPost?.id === item.name ? "active" : ""
                  }`}
                  onClick={() => handleFileClick(item)}
                >
                  <span className="file-icon">📄</span> {/* File icon */}
                  <span className="file-name">{item.name}</span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    );
  };

  const getReadingTime = (wordCount) =>
    `${Math.ceil(wordCount / 200)} min read`;

  const renderCardGrid = () => {
    const displayedPosts = activeCategory
      ? allPosts.filter((post) => post.category === activeCategory)
      : allPosts;

    const searchedAndFilteredPosts = searchQuery
      ? displayedPosts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : displayedPosts;

    return (
      <div className="blog-card-grid">
        {searchedAndFilteredPosts.map((post) => (
          <div
            key={post.id}
            className="blog-card"
            onClick={() => setSelectedPost(post)}
          >
            {/* Category Tag */}
            {post.category && (
              <span className="category-tag">{post.category}</span>
            )}
            <h3>{post.title}</h3>
            <p>{post.preview}</p>
            <span className="reading-time">
              {getReadingTime(post.wordCount)}
            </span>
          </div>
        ))}
        {searchedAndFilteredPosts.length === 0 && (
          <p>
            No posts found matching your criteria in this category or search.
          </p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  const categories = Array.from(
    new Set(allPosts.map((post) => post.category))
  ).filter(Boolean);

  return (
    <div className="blog-layout">
      <button
        className={`sidebar-toggle ${sidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      <div className="sidebar-overlay" onClick={toggleSidebar} />

      <div className={`blog-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3
            onClick={() => {
              setSelectedPost(null);
              setActiveCategory(null);
              setSearchQuery("");
              setExpandedFolders({});
            }}
            style={{ cursor: "pointer" }}
          >
            Documentation
          </h3>
          <div className="sidebar-search">
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedPost(null);
              }}
            />
          </div>
          <div className="sidebar-filters">
            <button
              className={`filter-btn ${
                activeCategory === null ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(null);
                setSelectedPost(null);
                setSearchQuery("");
                setExpandedFolders({});
              }}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedPost(null);
                  setSearchQuery("");
                  setExpandedFolders((prev) => {
                    const newState = {};
                    const findAndExpand = (structure, currentPath = "") => {
                      structure.forEach((item) => {
                        const itemPath = currentPath
                          ? `${currentPath}/${item.name}`
                          : item.name;
                        if (item.type === "folder") {
                          if (item.name === category) {
                            newState[itemPath] = true;
                            let parentPath = currentPath;
                            while (parentPath) {
                              newState[parentPath] = true;
                              parentPath = parentPath.substring(
                                0,
                                parentPath.lastIndexOf("/")
                              );
                            }
                          } else if (item.children) {
                            findAndExpand(item.children, itemPath);
                          }
                        }
                      });
                    };
                    findAndExpand(folderStructure);
                    return newState;
                  });
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="folder-structure">
          {structureToRender.map((folder) => renderFolder(folder))}
        </div>
      </div>

      <div className="blog-content" onClick={handleContentClick}>
        {selectedPost ? (
          <div className="post-container">
            <div className="post-header">
              <h1>{selectedPost.title}</h1>
              <div className="post-meta">
                <span className="post-date">
                  Last updated: {new Date().toLocaleDateString()}{" "}
                </span>
                <span className="post-reading-time">
                  {getReadingTime(selectedPost.wordCount)} {/* Reading time */}
                </span>
              </div>
            </div>
            <article
              ref={postContentRef}
              className="blog-post"
              dangerouslySetInnerHTML={{ __html: selectedPost.html }}
            />
            <div className="post-footer">
              <div className="post-tags">
                <span>Tags:</span>
                {selectedPost.category && (
                  <span className="tag">{selectedPost.category}</span>
                )}
                <span className="tag">Documentation</span>
                <span className="tag">Guide</span>
              </div>
              <div className="post-actions">
                <button className="action-btn">👍 Like</button>
                <button className="action-btn">🔗 Share</button>
                <button className="action-btn">📌 Save</button>
              </div>
            </div>
          </div>
        ) : (
          renderCardGrid()
        )}
      </div>
    </div>
  );
};

export default BlogPost;
